# User API Specification

## Register User API

**Endpoint** : POST `/api/users`

**Request Body** :

```json
{
  "username": "Farhan Saleh",
  "email": "farhan@gmail.com",
  "password": "rahasia",
  "confirm-password": "rahasia"
}
```

**Response Body Success** :

```json
{
  "message": "Registrasi Berhasil",
  "data": {
    "username": "farhan",
    "email": "farhan@gmail.com"
  }
}
```

**Response Body Error** :

```json
{
  "errors": "Email sudah terdaftar"
}
```

## Login User API

**Endpoint** : POST `/api/users/login`

**Request Body** :

```json
{
  "email": "farhan@gmail.com",
  "password": "rahasia"
}
```

**Response Body Success** :

```json
{
  "message": "Login Berhasil",
  "data": {
    "token": "unique-token"
  }
}
```

**Response Body Error** :

```json
{
  "errors": "Email atau password salah"
}
```

## Update User API

**Endpoint** : PATCH `/api/users/current`

**Headers** :

- Authorization : token

**Request Body** :

```json
{
  "username": "Farhan Saleh Lagi", //Optional
  "full_name": "Muhammad Farhan Saleh", //Optional
  "gender": "laki-laki", //Optional
  "profile_picture": "image-file" //Optional
}
```

**Response Body Success** :

```json
{
  "message": "Berhasil mengupdate profil",
  "data": {
    "username": "Farhan Saleh Lagi",
    "full_name": "Muhammad Farhan Saleh",
    "gender": "laki-laki",
    "profile_picture": "image-file"
  }
}
```

**Response Body Error** :

```json
{
  "errors": [
    {
      "name": "username",
      "message": "username harus lebih dari 3 karakter"
    },
    {
      "name": "full_name",
      "message": "nama lengkap harus lebih dari 3 karakter"
    }
  ]
}
```

## Forget Password User API

**Endpoint** : POST `/api/users/password`

**Request Body** :

```json
{
  "email": "farhan@gmail.com"
}
```

**Response Body Success** :

```json
{
  "message": "Berhasil mengirim permintaan, silahkan cek email anda"
}
```

**Response Body Error** :

```json
{
  "errors": "format email salah"
}
```

## Reset Password User API

**Endpoint** : PATCH `/api/users/password`

**Request Body** :

```json
{
  "password": "rahasia",
  "confirm-password": "rahasia"
}
```

**Response Body Success** :

```json
{
  "message": "Berhasil reset password"
}
```

**Response Body Error** :

```json
{
  "errors": "password dan konfirmasi password harus sama"
}
```

## Get Current User API

**Endpoint** : GET `/api/users/current`

**Headers** :

- Authorization : token

**Response Body Success** :

```json
{
  "message": "Berhasil mengambil data",
  "data": {
    "email": "farhan@gmail.com",
    "username": "Farhan Saleh",
    "full_name": "Muhammad Farhan Saleh",
    "gender": "laki-laki",
    "profile_picture": "image-url"
  }
}
```

**Response Body Error** :

```json
{
  "errors": "Unauthorized"
}
```

## Get User By Id API

**Endpoint** : GET `/api/users/{id}`

**Headers** :

- Authorization : token

**Response Body Success** :

```json
{
  "message": "Berhasil mengambil data",
  "data": {
    "email": "oranglain12@gmail.com",
    "username": "Orang Lain",
    "full_name": "Full Orang Lain",
    "gender": "laki-laki",
    "profile_picture": "image-url"
  }
}
```

**Response Body Error** :

```json
{
  "errors": "Data tidak ditemukan"
}
```

## Logout User API

**Endpoint** : DELETE /api/users/logout

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
