export const DatabaseConstants = () => ({
    database: {
        type: process.env.DB_ENGINE,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: Boolean(process.env.DB_SYNCHRONIZE),
        entities: [
            `${__dirname}/../**/*.entity{.ts,.js}`,
        ],
        migrations: [
            'src/database/migrations/*.ts',
        ],
        cli: {
            migrationsDir: 'src/database/migrations',
        },
    }
});