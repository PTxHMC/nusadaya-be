# User API Specification

**User role**

- TEACHER : CRUD learning content and game
- USER : READ learning content and game (default)
- ADMIN : CREATE Category

## Register User API

**Endpoint** : POST `/api/users/register`

**Request Body** :

```json
{
  "username": "Farhan Saleh",
  "email": "farhan@gmail.com",
  "password": "rahasia",
  "confirm_password": "rahasia",
  "role": "TEACHER"
}
```

**Response Body Success** :

```json
{
  "message": "Registrasi Berhasil, silahkan cek email anda untuk verifikasi",
  "data": {
    "username": "farhan",
    "email": "farhan@gmail.com",
    "role": "TEACHER"
  }
}
```

**Response Body Error** :

```json
{
  "message": "Email sudah terdaftar,password dan konfirmasi password harus sama"
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
    "access_token": "unique-token"
  }
}
```

**Response Body Error** :

```json
{
  "message": "Email atau password salah"
}
```

## Update User Profile API

**Endpoint** : PATCH `/api/users/profile`

**Headers** :

- Authorization : token

**Request Body** :

```json
{
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
    "full_name": "Muhammad Farhan Saleh",
    "gender": "laki-laki",
    "profile_picture": "image-file"
  }
}
```

**Response Body Error** :

```json
{
  "message": "username harus lebih dari 3 karakter,nama lengkap harus lebih dari 3 karakter"
}
```

## Get Current User API

**Endpoint** : GET `/api/users/profile`

**Headers** :

- Authorization : token

**Response Body Success** :

```json
{
  "message": "Berhasil mengambil data",
  "data": {
    "email": "farhan@gmail.com",
    "username": "Farhan Saleh",
    "role": "USER",
    "full_name": "Muhammad Farhan Saleh",
    "gender": "laki-laki",
    "profile_picture": "image-url"
  }
}
```

**Response Body Error** :

```json
{
  "message": "Unauthorized"
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
  "message": "Data tidak ditemukan"
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
  "message": "Unauthorized"
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
  "message": "format email salah"
}
```

## Reset Password User API

**Endpoint** : PATCH `/api/users/password`

**Request Body** :

```json
{
  "token": "unique-token", //untuk sekarang masih mengirim token dri body
  "password": "rahasia",
  "confirm_password": "rahasia"
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
  "message": "password dan konfirmasi password harus sama"
}
```
