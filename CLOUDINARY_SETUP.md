# Cloudinary Upload Preset 配置指南

## 你需要在 Cloudinary 创建 Upload Preset 才能上传文件

### 步骤：

1. 登录 [Cloudinary](https://cloudinary.com/console)
2. 进入 **Settings** → **Upload**
3. 滚动到 **Upload presets** 部分
4. 点击 **Add upload preset**
5. 配置如下：

```
Preset Name: ml_default (或你喜欢的名字)
Signing Mode: Unsigned ⭐ (重要！)
Folder: media
```

6. 点击 **Save**

### 完成后：

把创建的 preset name 添加到 `admin/config.js`:

```javascript
window.APP_CONFIG = {
    // ...
    cloudinaryUploadPreset: '你的preset名字'
};
```

---

## 验证上传是否正常

上传一张测试图片，检查是否成功：
- 打开 [Cloudinary Media Library](https://cloudinary.com/console/media_library)
- 看看文件是否出现在 media 文件夹中

---

## 常见问题

### Q: 为什么必须用 Unsigned?
A: Unsigned 允许前端直接上传，不需要 API Secret。只有你信任的前端域名才应该使用 Unsigned preset。

### Q: 可以限制文件类型吗？
A: 可以，在 Cloudinary Settings → Upload 中可以设置：
- Allowed upload modes
- Allowed file types
- Maximum file size

### Q: 上传后的文件在哪里？
A: 会在你指定的 `media` 文件夹中，可以通过 Cloudinary Dashboard 查看。