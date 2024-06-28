# Game API Specification

**Type Game** : Untuk sekarang tipe gamenya hanya 1 yaitu quiz.

**Content Structure** :

- quiz

  ```json
  {
    "content": [
      {
        "id": 1,
        "media": "img-url/video-url",
        "question": "ini gambar apa?",
        "option": [
          {
            "id": 1,
            "value": "rumah bodo"
          },
          {
            "id": 2,
            "value": "rumah 2"
          },
          {
            "id": 3,
            "value": "rumah 4"
          },
          {
            "id": 4,
            "value": "rumah rumahan"
          }
        ],
        "correct_answer": 1, // id option
        "score":100,
      },
      ...
    ]
  }
  ```

  **Description** :

  - **id** : ini untuk penanda pertanyaannya
  - **media** : isi foto atau video di pertanyaannya
  - **question** : Pertanyaan
  - **option** :
    - **id** untuk heading
    - **value** nilai atau teks yang ditampilkan
  - **correct_answer** : id pertanyaan yang benar
  - **score** : nilai score dari pertanyaan

<br>

## Create Game API

**Endpoint** : POST `/api/game`

**Headers** :

- Authorization : token

**Request Body** :

```json
{
  "title": "Quiz Tebak Gambar Rumah Daerah",
  "description": "Quiz untuk mengetes pengetahuan kamu tentang rumah daerah",
  "id_game_type": 1,
  "content": [
    {
      "id": 1,
      "media": "img-url/video-url",
      "question": "ini gambar apa?",
      "option": [
        {
          "id": 1,
          "value": "rumah bodo"
        },
        {
          "id": 2,
          "value": "rumah 2"
        },
        {
          "id": 3,
          "value": "rumah 4"
        },
        {
          "id": 4,
          "value": "rumah rumahan"
        }
      ],
      "correct_answer": 1,
      "score":100,
    },
    ...
  ],
  "thumbnail": "file-image"
}
```

**Response Body Success** :

```json
{
  "message": "Berhasil Menambahkan Game",
  "data": {
    "id": 1,
    "title": "Quiz Tebak Gambar Rumah Daerah",
    "description": "Quiz untuk mengetes pengetahuan kamu tentang rumah daerah",
    "id_game_type": 1,
    "thumbnail": "file-image",
    "created_at": "2024-09-21",
    "updated_at": "2024-09-21"
  }
}
```

**Response Body Error** :

```json
{
  "errors": "Server Error"
}
```

## Get All Game API

**Endpoint** : GET `/api/game` | `/api/game?page={current-page}&limit={limit}`

**Response Body Success** :

```json
{
  "message": "Berhasil Mengambil Data",
  "pagination": {
    "total_items": 50,
    "total_pages": 5,
    "current_page": 1,
    "limit": 10
  },
  "data": [
    {
      "id": 1,
      "title": "Quiz Tebak Gambar Rumah Daerah",
      "description": "Quiz untuk mengetes pengetahuan kamu tentang rumah daerah",
      "id_game_type": 1,
      "thumbnail": "file-image",
      "created_at": "2024-09-21",
    },
    ...
  ]
}
```

**Response Body Error** :

```json
{
  "errors": "Data tidak ditemukan"
}
```

## Get Game By Id API

**Endpoint** : GET `/api/game/{id}`

**Response Body Success** :

```json
{
  "message": "Game berhasil ditemukan",
  "data": {
    "title": "Quiz Tebak Gambar Rumah Daerah",
    "description": "Quiz untuk mengetes pengetahuan kamu tentang rumah daerah",
    "id_game_type": 1,
    "content": [
        {
          "id": 1,
          "media": "img-url/video-url",
          "question": "ini gambar apa?",
          "option": [
              {
                "id": 1,
                "value": "rumah bodo"
              },
              {
                "id": 2,
                "value": "rumah 2"
              },
              {
                "id": 3,
                "value": "rumah 4"
              },
              {
                "id": 4,
                "value": "rumah rumahan"
              }
          ],
          "correct_answer": 1,
          "score":100,
        },
        ...
    ],
    "thumbnail": "file-image",
    "id_user": "current-user",
    "created_at": "2024-09-21",
    "updated_at": "2024-09-21"
  }
}
```

**Response Body Error** :

```json
{
  "errors": "data tidak ditemukan"
}
```

## Update Game By Id API

**Endpoint** : PUT `/api/game/{id}`

**Headers** :

- Authorization : token

**Request Body** :

```json
{
  "id": 1,
  "title": "Quiz Tebak Gambar Rumah Daerah",
  "description": "Quiz untuk mengetes pengetahuan kamu tentang rumah daerah",
  "id_game_type": 1,
  "content": [
    {
      "id": 1,
      "media": "img-url/video-url",
      "question": "ini gambar apa?",
      "option": [
        {
          "id": 1,
          "value": "rumah bodo"
        },
        {
          "id": 2,
          "value": "rumah 2"
        },
        {
          "id": 3,
          "value": "rumah 4"
        },
        {
          "id": 4,
          "value": "rumah rumahan"
        }
      ],
      "correct_answer": 1,
      "score":100,
    },
    ...
  ],
  "thumbnail": "file-image"
}
```

**Response Body Success** :

```json
{
  "message": "Berhasil Mengedit Game",
  "data": {
    "id": 1,
    "title": "Quiz Tebak Gambar Rumah Daerah",
    "description": "Quiz untuk mengetes pengetahuan kamu tentang rumah daerah",
    "id_game_type": 1,
    "thumbnail": "file-image",
    "created_at": "2024-09-21",
    "updated_at": "2024-09-25"
  }
}
```

**Response Body Error** :

```json
{
  "errors": "Server Error"
}
```

## Delete Game API

**Endpoint** : DELETE `/api/game/{id}`

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
  "errors": "Server Error"
}
```

## Submit Answer Game API

**Endpoint** : POST `/api/game/play/{id}`

**Headers** :

- Authorization : token

**Request Body** :

```json
{
  "answer": [
    {
      "id_question": 1,
      "id_option": 2,
    },
    {
      "id_question": 2,
      "id_option": 4,
    },
    ...
  ]
}
```

**Description**

`answer` merupakan array of object dimana terdapat objek dengan 2 key yaitu `id_question` yang merupakan id dari pertanyaannya dan `id_option` yang merupakan id dari jawabannya.

**Response Body Success** :

```json
{
  "message": "Berhasil Mengirim Jawaban",
  "data": {
    "score": 1000
  }
}
```

**Response Body Error** :

```json
{
  "errors": "Server Error"
}
```
