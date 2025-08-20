"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Upload,
  File,
  Folder,
  Search,
  Filter,
  Download,
  Share2,
  Trash2,
  FolderPlus,
  ImageIcon,
  FileText,
  Video,
  Music,
  Archive,
  MoreHorizontal,
  Grid3X3,
  List,
  SortAsc,
  User,
  Lock,
  Unlock,
} from "lucide-react"
import { format } from "date-fns"

interface FileItem {
  id: string
  name: string
  type: "file" | "folder"
  size?: number
  mimeType?: string
  createdAt: Date
  modifiedAt: Date
  owner: {
    id: string
    name: string
    avatar?: string
  }
  permissions: "private" | "team" | "public"
  tags: string[]
  projectId?: string
  taskId?: string
  parentId?: string
  isShared: boolean
  downloadCount: number
  preview?: string
}

interface Project {
  id: string
  name: string
  color: string
}

function FileManager() {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: "1",
      name: "Презентация ИИ-решений",
      type: "file",
      size: 2456789,
      mimeType: "application/pdf",
      createdAt: new Date(2024, 11, 15),
      modifiedAt: new Date(2024, 11, 16),
      owner: { id: "1", name: "Анна Петрова", avatar: "/team-1.jpg" },
      permissions: "team",
      tags: ["Презентация", "ИИ", "Клиенты"],
      projectId: "1",
      isShared: true,
      downloadCount: 12,
      parentId: "folder-1",
    },
    {
      id: "2",
      name: "Анализ рынка",
      type: "folder",
      createdAt: new Date(2024, 11, 10),
      modifiedAt: new Date(2024, 11, 16),
      owner: { id: "2", name: "Михаил Иванов", avatar: "/team-2.jpg" },
      permissions: "team",
      tags: ["Аналитика", "Исследование"],
      isShared: false,
      downloadCount: 0,
    },
    {
      id: "3",
      name: "Логотип компании.png",
      type: "file",
      size: 156789,
      mimeType: "image/png",
      createdAt: new Date(2024, 11, 12),
      modifiedAt: new Date(2024, 11, 12),
      owner: { id: "3", name: "Елена Сидорова", avatar: "/team-3.jpg" },
      permissions: "public",
      tags: ["Дизайн", "Брендинг"],
      isShared: true,
      downloadCount: 25,
      preview: "/generic-company-logo.png",
    },
    {
      id: "4",
      name: "Отчет по продажам Q4.xlsx",
      type: "file",
      size: 987654,
      mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      createdAt: new Date(2024, 11, 14),
      modifiedAt: new Date(2024, 11, 15),
      owner: { id: "2", name: "Михаил Иванов", avatar: "/team-2.jpg" },
      permissions: "private",
      tags: ["Отчет", "Продажи", "Q4"],
      projectId: "2",
      taskId: "1",
      isShared: false,
      downloadCount: 5,
    },
  ])

  const [currentFolder, setCurrentFolder] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showCreateFolderDialog, setShowCreateFolderDialog] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const [newFolder, setNewFolder] = useState({
    name: "",
    permissions: "team" as const,
    tags: "",
  })

  const projects: Project[] = [
    { id: "1", name: "Автоматизация продаж", color: "blue" },
    { id: "2", name: "ИИ-чатбот", color: "green" },
    { id: "3", name: "Анализ клиентов", color: "purple" },
  ]

  const getFileIcon = (file: FileItem) => {
    if (file.type === "folder") return Folder

    if (!file.mimeType) return File

    if (file.mimeType.startsWith("image/")) return ImageIcon
    if (file.mimeType.startsWith("video/")) return Video
    if (file.mimeType.startsWith("audio/")) return Music
    if (file.mimeType.includes("pdf") || file.mimeType.includes("document")) return FileText
    if (file.mimeType.includes("zip") || file.mimeType.includes("archive")) return Archive

    return File
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Б"
    const k = 1024
    const sizes = ["Б", "КБ", "МБ", "ГБ"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getPermissionColor = (permission: string) => {
    switch (permission) {
      case "private":
        return "bg-red-500/10 text-red-600 border-red-500/30"
      case "team":
        return "bg-blue-500/10 text-blue-600 border-blue-500/30"
      case "public":
        return "bg-green-500/10 text-green-600 border-green-500/30"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/30"
    }
  }

  const getPermissionLabel = (permission: string) => {
    switch (permission) {
      case "private":
        return "Приватный"
      case "team":
        return "Команда"
      case "public":
        return "Публичный"
      default:
        return "Неизвестно"
    }
  }

  const filteredFiles = files
    .filter((file) => {
      if (currentFolder && file.parentId !== currentFolder) return false
      if (!currentFolder && file.parentId) return false

      if (searchQuery && !file.name.toLowerCase().includes(searchQuery.toLowerCase())) return false

      if (selectedFilter !== "all") {
        if (selectedFilter === "folders" && file.type !== "folder") return false
        if (selectedFilter === "images" && !file.mimeType?.startsWith("image/")) return false
        if (selectedFilter === "documents" && !file.mimeType?.includes("document") && !file.mimeType?.includes("pdf"))
          return false
        if (selectedFilter === "shared" && !file.isShared) return false
      }

      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "date":
          return b.modifiedAt.getTime() - a.modifiedAt.getTime()
        case "size":
          return (b.size || 0) - (a.size || 0)
        default:
          return 0
      }
    })

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    console.log("Загружаемые файлы:", droppedFiles)
    if (droppedFiles.length > 0) {
      processFileUpload(droppedFiles)
    }
  }, [])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || [])
    console.log("Загружаемые файлы:", uploadedFiles)
    if (uploadedFiles.length > 0) {
      processFileUpload(uploadedFiles)
    }
  }

  const processFileUpload = async (filesToUpload: File[]) => {
    setIsUploading(true)
    setUploadProgress(0)
    setUploadedFiles(filesToUpload)

    try {
      const newFiles: FileItem[] = []

      for (let i = 0; i < filesToUpload.length; i++) {
        const file = filesToUpload[i]

        await new Promise((resolve) => setTimeout(resolve, 500))

        const newFile: FileItem = {
          id: Date.now().toString() + i,
          name: file.name,
          type: "file",
          size: file.size,
          mimeType: file.type,
          createdAt: new Date(),
          modifiedAt: new Date(),
          owner: { id: "current", name: "Текущий пользователь" },
          permissions: "team",
          tags: [],
          isShared: false,
          downloadCount: 0,
          parentId: currentFolder,
          preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
        }

        newFiles.push(newFile)
        setUploadProgress(((i + 1) / filesToUpload.length) * 100)
      }

      setFiles((prevFiles) => [...prevFiles, ...newFiles])

      setTimeout(() => {
        setShowUploadDialog(false)
        setIsUploading(false)
        setUploadProgress(0)
        setUploadedFiles([])
      }, 1000)
    } catch (error) {
      console.error("Ошибка загрузки файлов:", error)
      setIsUploading(false)
      setUploadProgress(0)
      setUploadedFiles([])
    }
  }

  const handleCreateFolder = () => {
    if (!newFolder.name) return

    const folder: FileItem = {
      id: Date.now().toString(),
      name: newFolder.name,
      type: "folder",
      createdAt: new Date(),
      modifiedAt: new Date(),
      owner: { id: "1", name: "Текущий пользователь" },
      permissions: newFolder.permissions,
      tags: newFolder.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      isShared: newFolder.permissions !== "private",
      downloadCount: 0,
      parentId: currentFolder,
    }

    setFiles([...files, folder])
    setNewFolder({ name: "", permissions: "team", tags: "" })
    setShowCreateFolderDialog(false)
  }

  const handleFileAction = (action: string, fileId: string) => {
    console.log(`Действие ${action} для файла ${fileId}`)
  }

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles((prev) => (prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]))
  }

  const storageStats = {
    used: 15.7, // GB
    total: 100, // GB
    files: files.length,
    folders: files.filter((f) => f.type === "folder").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Файловое хранилище</h2>
          <p className="text-muted-foreground">Управление документами и медиафайлами</p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={showCreateFolderDialog} onOpenChange={setShowCreateFolderDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <FolderPlus className="w-4 h-4 mr-2" />
                Папка
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Создать папку</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="folder-name">Название папки</Label>
                  <Input
                    id="folder-name"
                    value={newFolder.name}
                    onChange={(e) => setNewFolder({ ...newFolder, name: e.target.value })}
                    placeholder="Введите название папки"
                  />
                </div>
                <div>
                  <Label>Права доступа</Label>
                  <Select
                    value={newFolder.permissions}
                    onValueChange={(value: any) => setNewFolder({ ...newFolder, permissions: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Приватный</SelectItem>
                      <SelectItem value="team">Команда</SelectItem>
                      <SelectItem value="public">Публичный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="folder-tags">Теги (через запятую)</Label>
                  <Input
                    id="folder-tags"
                    value={newFolder.tags}
                    onChange={(e) => setNewFolder({ ...newFolder, tags: e.target.value })}
                    placeholder="Проект, Документы, Важное"
                  />
                </div>
                <Button onClick={handleCreateFolder} className="w-full">
                  Создать папку
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Upload className="w-4 h-4 mr-2" />
                Загрузить
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Загрузить файлы</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Загрузка файлов...</span>
                      <span className="text-sm text-muted-foreground">{Math.round(uploadProgress)}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                    <div className="text-xs text-muted-foreground">Загружено {uploadedFiles.length} файл(ов)</div>
                  </div>
                )}

                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragOver
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-primary/5"
                  } ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-foreground font-medium mb-2">
                    {isUploading ? "Загрузка..." : "Перетащите файлы сюда"}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {isUploading ? "Пожалуйста, подождите..." : "или выберите файлы для загрузки"}
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    disabled={isUploading}
                  />
                  <Button asChild variant="outline" disabled={isUploading}>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      {isUploading ? "Загрузка..." : "Выбрать файлы"}
                    </label>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{storageStats.used} ГБ</p>
              <p className="text-sm text-muted-foreground">Использовано</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{storageStats.total - storageStats.used} ГБ</p>
              <p className="text-sm text-muted-foreground">Доступно</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{storageStats.files}</p>
              <p className="text-sm text-muted-foreground">Файлов</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{storageStats.folders}</p>
              <p className="text-sm text-muted-foreground">Папок</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Использование хранилища</span>
              <span className="text-sm font-medium text-foreground">
                {Math.round((storageStats.used / storageStats.total) * 100)}%
              </span>
            </div>
            <Progress value={(storageStats.used / storageStats.total) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Поиск файлов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50 border-border/50"
            />
          </div>
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-full sm:w-40 bg-background/50">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все файлы</SelectItem>
              <SelectItem value="folders">Папки</SelectItem>
              <SelectItem value="images">Изображения</SelectItem>
              <SelectItem value="documents">Документы</SelectItem>
              <SelectItem value="shared">Общие</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-40 bg-background/50">
              <SortAsc className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">По имени</SelectItem>
              <SelectItem value="date">По дате</SelectItem>
              <SelectItem value="size">По размеру</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {currentFolder && (
        <div className="flex items-center space-x-2 text-sm">
          <Button variant="ghost" size="sm" onClick={() => setCurrentFolder(null)}>
            Корневая папка
          </Button>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">{files.find((f) => f.id === currentFolder)?.name}</span>
        </div>
      )}

      <div
        className={
          viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : "space-y-2"
        }
      >
        {filteredFiles.map((file) => {
          const FileIcon = getFileIcon(file)
          const isSelected = selectedFiles.includes(file.id)

          if (viewMode === "list") {
            return (
              <Card
                key={file.id}
                className={`bg-card/50 backdrop-blur-sm border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border/50 hover:border-primary/30 hover:bg-card/70"
                }`}
                onClick={() => {
                  if (file.type === "folder") {
                    setCurrentFolder(file.id)
                  } else {
                    toggleFileSelection(file.id)
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <FileIcon className="w-8 h-8 text-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground truncate">{file.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{format(file.modifiedAt, "dd.MM.yyyy")}</span>
                          {file.size && <span>{formatFileSize(file.size)}</span>}
                          <div className="flex items-center space-x-1">
                            <Avatar className="w-4 h-4">
                              <AvatarImage src={file.owner.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">
                                {file.owner.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{file.owner.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPermissionColor(file.permissions)}>
                        {getPermissionLabel(file.permissions)}
                      </Badge>
                      {file.isShared && <Share2 className="w-4 h-4 text-blue-500" />}
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          }

          return (
            <Card
              key={file.id}
              className={`bg-card/50 backdrop-blur-sm border transition-all duration-300 cursor-pointer group ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border/50 hover:border-primary/30 hover:bg-card/70 hover:shadow-lg"
              }`}
              onClick={() => {
                if (file.type === "folder") {
                  setCurrentFolder(file.id)
                } else {
                  toggleFileSelection(file.id)
                }
              }}
            >
              <CardContent className="p-4">
                <div className="aspect-square mb-3 flex items-center justify-center bg-background/50 rounded-lg relative overflow-hidden">
                  {file.preview ? (
                    <img
                      src={file.preview || "/placeholder.svg"}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FileIcon className="w-12 h-12 text-primary" />
                  )}
                  {file.isShared && (
                    <div className="absolute top-2 right-2">
                      <Share2 className="w-4 h-4 text-blue-500 bg-white rounded-full p-1" />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-foreground truncate text-sm" title={file.name}>
                    {file.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Avatar className="w-4 h-4">
                        <AvatarImage src={file.owner.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {file.owner.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground truncate">{file.owner.name}</span>
                    </div>
                    <Badge className={`${getPermissionColor(file.permissions)} text-xs`}>
                      {file.permissions === "private" ? (
                        <Lock className="w-3 h-3" />
                      ) : file.permissions === "public" ? (
                        <Unlock className="w-3 h-3" />
                      ) : (
                        <User className="w-3 h-3" />
                      )}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{format(file.modifiedAt, "dd.MM")}</span>
                    {file.size && <span>{formatFileSize(file.size)}</span>}
                  </div>
                  {file.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {file.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                          {tag}
                        </Badge>
                      ))}
                      {file.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          +{file.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 bg-background/80">
                    <MoreHorizontal className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <File className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium text-foreground mb-2">Файлы не найдены</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? "Попробуйте изменить поисковый запрос" : "Загрузите первые файлы в хранилище"}
          </p>
          <Button onClick={() => setShowUploadDialog(true)} className="bg-primary hover:bg-primary/90">
            <Upload className="w-4 h-4 mr-2" />
            Загрузить файлы
          </Button>
        </div>
      )}

      {selectedFiles.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg shadow-lg p-4 flex items-center space-x-2">
          <span className="text-sm text-foreground">Выбрано: {selectedFiles.length}</span>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={() => handleFileAction("download", "")}>
              <Download className="w-4 h-4 mr-1" />
              Скачать
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleFileAction("share", "")}>
              <Share2 className="w-4 h-4 mr-1" />
              Поделиться
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleFileAction("delete", "")}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Удалить
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setSelectedFiles([])}>
              Отмена
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FileManager
export { FileManager }
