# Learning Content API Specification

## Create Learning Content API

**Endpoint** : POST `/api/learning-content`

**Headers** :

- Authorization : token

**Request Body** :

```json
{
  "title": "Belajar Bahasa Kaili",
  "content": "#Ini title **a**", // isinya adalah text markdown
  "thumbnail": "file-image",
  "category": [1, 2, 3] // id category
}
```

**Response Body Success** :

```json
{
  "message": "Berhasil Menambahkan Materi",
  "data": {
    "id": 1,
    "title": "Belajar Bahasa Kaili",
    "content":"content": "#Ini title **a**", // isinya adalah text markdown
    "thumbnail": "image-url",
    "category": ["nama kategori", "nama kategori"],
    "created_at": "2024-09-21",
    "updated_at": "2024-09-21"
  }
}
```

**Response Body Error** :

```json
{
  "message": "Server Error"
}
```

## Get All Learning Content API

**Endpoint** : GET `/api/learning-content` | `/api/learning-content?page={current-page}&limit={limit}`

**Response Body Success** :

```json
{
  "message": "Berhasil Mengambil Data",
  "data": [
    {
      "id": 1,
      "title": "Belajar Bahasa Kaili",
      "thumbnail": "image-url",
      "user": "username",
      "category": ["nama kategori", "nama kategori"],
      "created_at": "2024-09-21"
    },
    {
      "id": 2,
      "title": "Belajar Bahasa Bugis",
      "thumbnail": "image-url",
      "user": "username",
      "category": ["nama kategori", "nama kategori"],
      "created_at": "2024-09-21",
    },
    ...
  ],
  "pagination": {
    "total_items": 50,
    "total_pages": 5,
    "current_page": 1,
    "limit": 10
  },
}
```

**Response Body Error** :

```json
{
  "message": "Data tidak ditemukan"
}
```

## Get All My Learning Content API

**Endpoint** : GET `/api/learning-content/my` | `/api/learning-content/my?page={current-page}&limit={limit}`

**Response Body Success** :

```json
{
  "message": "Berhasil Mengambil Data",
  "data": [
    {
      "id": 1,
      "title": "Belajar Bahasa Kaili",
      "thumbnail": "image-url",
      "user": "username",
      "category": ["nama kategori", "nama kategori"],
      "created_at": "2024-09-21"
    },
    {
      "id": 2,
      "title": "Belajar Bahasa Bugis",
      "thumbnail": "image-url",
      "user": "username",
      "category": ["nama kategori", "nama kategori"],
      "created_at": "2024-09-21",
    },
    ...
  ],
  "pagination": {
    "total_items": 50,
    "total_pages": 5,
    "current_page": 1,
    "limit": 10
  },
}
```

**Response Body Error** :

```json
{
  "message": "Data tidak ditemukan"
}
```

## Get Learning Content By Id API

**Endpoint** : GET `/api/learning-content/{id}`

**Response Body Success** :

```json
{
  "message": "Data berhasil ditemukan",
  "data": {
    "id": 1,
    "title": "Belajar Bahasa Kaili",
    "content": "content": "#Ini title **a**", // isinya adalah text markdown,
    "thumbnail": "file-image",
    "user": "username",
    "category": ["nama kategori", "nama kategori"],
    "created_at": "2024-09-21",
    "updated_at": "2024-09-21"
  }
}
```

**Response Body Error** :

```json
{
  "message": "data tidak ditemukan"
}
```

## Update Learning Content By Id API

**Endpoint** : PUT `/api/learning-content/{id}`

**Headers** :

- Authorization : token

**Request Body** :

```json
{
  "id": 1,
  "title": "Belajar Bahasa Kaili New Edition",
  "content": "###judul baru",
  "thumbnail": "file-image",
  "category": [1, 2, 3] // id category
}
```

**Response Body Success** :

```json
{
  "message": "Berhasil Mengupdate Materi",
  "data": {
    "id": "1",
    "title": "Belajar Bahasa Kaili New Edition",
    "description": "Materi ini merupakan materi baru pembelajaran bahasa kaili",
    "content": "content": "#Ini title **a**", // isinya adalah text markdown
    "thumbnail": "file-image",
    "category": ["nama kategori", "nama kategori"],
    "created_at": "2024-09-21",
    "updated_at": "2024-09-25"
  }
}
```

**Response Body Error** :

```json
{
  "message": "Server Error"
}
```

## Delete Learning Content API

**Endpoint** : DELETE `/api/learning-content/{id}`

**Headers** :

- Authorization : token

**Response Body Success** :

```json
{
  "message": "Berhasil Menghapus Materi"
}
```

**Response Body Error** :

```json
{
  "message": "Server Error"
}
```
