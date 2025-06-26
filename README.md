
# Setup

- clone the repository
- run `npm install`
- run `cp .env.example .env`
- replace the placeholder values
- run `npm run migrate`
- run `npm run dev`

# S3 Minio Docker setup

- run `docker run -d --name minio \
  -p 9000:9000 \
  -e MINIO_ROOT_USER=minioadmin \
  -e MINIO_ROOT_PASSWORD=minioadmin \
  -v minio-data:/data \
  minio/minio server /data`
