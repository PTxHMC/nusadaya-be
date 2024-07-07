# Learning Content API Specification

**Content Field Structure**

```json
{
  "content": {
    "section": [
      {
        "type": "heading",
        "value": "Kata Benda",
        "attribute": {
          "level": 1
        },
        "style": ["bold", "italic"]
      },
      {
        "type": "text",
        "value": "Kata benda dalam bahasa kaili biasanya...",
        "attribute": {}
      },
      {
        "type": "list",
        "value": "",
        "attribute": {
          "item": ["kata-1", "kata-2", "kata-3"]
        }
      }
    ]
  }
}
```

**Description Content**

isi `content` berupa bentuk JSON yang dimana terdapat key `section` nah untuk isi kontennya akan berada didalam key ini, untuk gambaran bagaimana di Front-end nanti bisa lihat seperti notion, berikut penjelasannya:

- **type** : `"heading"` | `"text"` | `"ordered-list"`, `"unordered-list"` | `"image"`
- **value** : isi konten misalnya teks untuk heading
- **attribute** : Berisi properti tambahan yang spesifik untuk setiap tipe konten
  - `level` untuk heading
  - `item` untuk list, yang isinya adalah array dari string
  - `alt` untuk image, sebagai teks alternatif
- **style** : Berisi style dari isi teksnya misal text kita mau kasi bold, style bisa berupa class tailwind

<br>

## Create Learning Content API

**Endpoint** : POST `/api/learning-content`

**Headers** :

- Authorization : token

**Request Body** :

```json
{
  "title": "Belajar Bahasa Kaili",
  "description": "Materi ini merupakan materi pembelajaran bahasa kaili",
  "content": {
    "section": [
      {
        "type": "heading",
        "value": "Kata Benda",
        "attribute": {
          "level": 1
        },
        "style": ["bold", "italic"]
      },
      {
        "type": "text",
        "value": "Kata benda dalam bahasa kaili biasanya...",
        "attribute": {}
      },
      {
        "type": "list",
        "value": "",
        "attribute": {
          "item": ["kata-1", "kata-2", "kata-3"]
        }
      }
    ]
  },
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
    "description": "Materi ini merupakan materi pembelajaran bahasa kaili",
    "content": {
      "section": [
        {
          "type": "heading",
          "value": "Kata Benda",
          "attribute": {
            "level": 1
          },
          "style": ["bold", "italic"]
        },
        {
          "type": "text",
          "value": "Kata benda dalam bahasa kaili biasanya...",
          "attribute": {}
        },
        {
          "type": "list",
          "value": "",
          "attribute": {
            "item": ["kata-1", "kata-2", "kata-3"]
          }
        }
      ]
    },
    "thumbnail": "file-image",
    "category": [1, 2, 3], // id category
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
      "description": "Materi ini merupakan materi pembelajaran bahasa kaili",
      "thumbnail": "file-image",
      "id_user": 1,
      "category": [1, 2, 3], // id category
      "created_at": "2024-09-21"
    },
    {
      "id": 2,
      "title": "Belajar Bahasa Bugis",
      "description": "Materi ini merupakan materi pembelajaran bahasa Bugis",
      "thumbnail": "file-image",
      "id_user": 2,
      "category": [1, 2, 3], // id category
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
    "description": "Materi ini merupakan materi pembelajaran bahasa kaili",
    "content": {
      "section": [
        {
          "type": "heading",
          "value": "Kata Benda",
          "attribute": {
            "level": 1
          },
          "style": ["bold", "italic"]
        },
        {
          "type": "text",
          "value": "Kata benda dalam bahasa kaili biasanya...",
          "attribute": {}
        },
        {
          "type": "list",
          "value": "",
          "attribute": {
            "item": ["kata-1", "kata-2", "kata-3"]
          }
        }
      ]
    },
    "thumbnail": "file-image",
    "id_user": "current-user",
    "category": [1, 2, 3], // id category
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
  "id": 1
  "title": "Belajar Bahasa Kaili New Edition",
  "description": "Materi ini merupakan materi baru pembelajaran bahasa kaili",
  "content": {
    "section": [
      {
        "type": "heading",
        "value": "Kata Benda",
        "attribute": {
          "level": 1
        },
        "style": ["bold", "italic"]
      },
      {
        "type": "text",
        "value": "Kata benda dalam bahasa kaili biasanya...",
        "attribute": {}
      },
      {
        "type": "list",
        "value": "",
        "attribute": {
          "item": ["kata-1", "kata-2", "kata-3"]
        }
      }
    ]
  },
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
    "content": {
      "section": [
        {
          "type": "heading",
          "value": "Kata Benda",
          "attribute": {
            "level": 1
          },
          "style": ["bold", "italic"]
        },
        {
          "type": "text",
          "value": "Kata benda dalam bahasa kaili biasanya...",
          "attribute": {}
        },
        {
          "type": "list",
          "value": "",
          "attribute": {
            "item": ["kata-1", "kata-2", "kata-3"]
          }
        }
      ]
    },
    "thumbnail": "file-image",
    "category": [1, 2, 3], // id category
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
