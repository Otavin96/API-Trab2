# API-Trab2

API para trabalho da disciplina de Programação 3 do Curso ADS

npm run typeorm -- migration:generate src/common/infrastructure/typeorm/migrations/CreateProducts -- -d src/common/infrastructure/typeorm/index.ts

npm run typeorm:migrate

Tabelas do banco de dados: Client, Payment, Product, Category, Order, itemOrder

Client: id, cnpj, reason_social, email, phone, created_at, updated_at

Payment: id, description, type, day, created_at, updated_at

Product: id, name, sku, description, price, quantity, category_id, created_at, updated_at

Category: id, name, description, created_at, updated_at

Order: id, client.id, itemOrder[], valueTotal, payment_id, created_at, updated_at

itemOrder: id, product_id, quantity, valueTotal, created_at, updated_at
