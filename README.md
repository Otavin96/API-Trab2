# API-Trab2

API para trabalho da disciplina de Programação 3 do Curso ADS

npm run typeorm -- -d src/typeorm/index.ts migration:generate CreateUser

npm run typeorm -- -h src/typeorm/index.ts migration:run --name CreateUser

npm run typeorm -- migration:generate src/common/infrastructure/typeorm/migrations/CreateProducts -- -d src/common/infrastructure/typeorm/index.ts

npm run typeorm:migrate
