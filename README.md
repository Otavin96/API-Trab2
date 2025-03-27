# API-Trab2

API para trabalho da disciplina de Programação 3 do Curso ADS

npm run typeorm -- -d src/typeorm/index.ts migration:generate CreateUser

npm run typeorm -- -h src/typeorm/index.ts migration:run --name CreateUser

npm run typeorm -- migration:generate src/common/infrastructure/typeorm/migrations/CreateProducts -- -d src/common/infrastructure/typeorm/index.ts

npm run typeorm:migrate


Tabelas do banco de dados: Client, Payment, Product, Category, Order, itemOrder

Client: id, cnpj, reason_social, email, created_at, updated_at

Payment: id, cnpj, reason_social, email, created_at, updated_at

Product: id, cnpj, reason_social, email, created_at, updated_at

Category: id, cnpj, reason_social, email, created_at, updated_at

Order: id, cnpj, reason_social, email, created_at, updated_at

itemOrder: id, cnpj, reason_social, email, created_at, updated_at
