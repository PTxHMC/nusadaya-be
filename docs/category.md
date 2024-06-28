# Category API Specification

## Create Category API

**Endpoint** : POST `/api/category`

**Headers** :

- Authorization : token

**Request Body** :

```json
{
  "name": "bahasa daerah"
}
```

**Response Body Success** :

```json
{
  "message": "Berhasil menambahkan kategori",
  "data": {
    "id": 1,
    "name": "bahasa daerah"
  }
}
```

**Response Body Error** :

```json
{
  "errors": "Kategori telah terdaftar"
}
```

## Update Category API

**Endpoint** : PUT `/api/category`

**Headers** :

- Authorization : token

**Request Body** :

```json
{
  "name": "lagu daerah"
}
```

**Response Body Success** :

```json
{
  "message": "Berhasil mengupdate kategori",
  "data": {
    "id": 1,
    "name": "bahasa daerah"
  }
}
```

**Response Body Error** :

```json
{
  "errors": "Kategori telah terdaftar"
}
```

## Get Category API

**Endpoint** : GET `/api/category`

**Response Body Success** :

```json
{
  "message": "Berhasil mengambil data",
  "data": [
    {
      "id": 1,
      "name": "lagu daerah"
    },
    {
      "id": 2,
      "name": "monumen daerah"
    }
  ]
}
```

**Response Body Error** :

```json
{
  "errors": "Kategori tidak tersedia"
}
```

## Delete Category

**Endpoint** : DELETE /api/category/{id}

**Headers** :

- Authorization : token

**Response Body Success** :

```json
{
  "data": "OK"
}
```

**Response Body Error** :

```json
{
  "errors": "Unauthorized"
}
```
