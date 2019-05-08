import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from 'joi';

export interface EnvConfig {
    [prop: string]: string;
}

export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(filePath: string) {
        filePath = filePath.includes("undefined") ? "env/development.env" : filePath
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config);
    }
    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid(['development', 'production', 'test', 'provision'])
                .default('development'),

            PORT: Joi.number().default(8088),

            ORM_LOADING_PATH: Joi.string().required(),

            DATABASE_TYPE: Joi.string().default('mysql'),

            DATABASE_HOST: Joi.string().default('localhost'),

            DATABASE_PORT: Joi.number().default(3306),

            DATABASE_USER: Joi.string().default('root'),

            DATABASE_PWD: Joi.string(),

            DATABASE_DB: Joi.string().required(),

            DATABASE_SYNCHRONIZE: Joi.boolean().default(false),

            DATABASE_DROPSCHEMA: Joi.boolean().default(false),
            DATABASE_CACHE: Joi.boolean().default(false),

            REDIS_HOST: Joi.string().default('localhost'),
            REDIS_PORT: Joi.number().default(3306),
            REDIS_DB: Joi.string().default(1000),
            REDIS_NAME: Joi.string().default('db'),
            REDIS_PASSWORD: Joi.string(),


            EMAIL_HOST: Joi.string(),
            EMAIL_SERVICE: Joi.string(),
            EMAIL_PORT: Joi.number(),
            EMAIL_USER: Joi.string(),
            EMAIL_PWD: Joi.string(),
            EMAIL_FROM: Joi.string(),
        });

        const { error, value: validatedEnvConfig } = Joi.validate(
            envConfig,
            envVarsSchema,
        );
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }

    get env(): string {
        return this.envConfig.NODE_ENV;
    }

    get port(): number {
        return Number(this.envConfig.PORT);
    }

    get ormLoadingPath(): string {
        return this.envConfig.ORM_LOADING_PATH;
    }

    get databaseType(): string {
        return this.envConfig.DATABASE_TYPE;
    }

    get databaseHost(): string {
        return this.envConfig.DATABASE_HOST;
    }

    get databasePort(): number {
        return Number(this.envConfig.DATABASE_PORT);
    }

    get databaseUserName(): string {
        return this.envConfig.DATABASE_USER;
    }

    get databasePassword(): string {
        return this.envConfig.DATABASE_PWD;
    }

    get databaseName(): string {
        return this.envConfig.DATABASE_DB;
    }

    get databaseSynchronize(): boolean {
        return Boolean(this.envConfig.DATABASE_SYNCHRONIZE);
    }

    get databaseDropSchema(): boolean {
        return Boolean(this.envConfig.DATABASE_DROPSCHEMA);
    }
    get databaseCache(): boolean {
        return Boolean(this.envConfig.DATABASE_CACHE);
    }



    get redisHost(): string {
        return this.envConfig.REDIS_HOST;
    }
    get redisPort(): number {
        return Number(this.envConfig.REDIS_PORT);
    }
    get redisDb(): number {
        return Number(this.envConfig.REDIS_DB);
    }
    get redisName(): string {
        return this.envConfig.REDIS_NAME;
    }
    get redisPwd(): string {
        return this.envConfig.REDIS_PASSWORD;
    }


    get emailHost(): string {
        return this.envConfig.EMAIL_HOST;
    }
    get emailPort(): string {
        return this.envConfig.EMAIL_PORT;
    }
    get emailUser(): string {
        return this.envConfig.EMAIL_USER;
    }
    get emailPwd(): string {
        return this.envConfig.EMAIL_PWD;
    }
    get emailService(): string {
        return this.envConfig.EMAIL_SERVICE;
    }
    get emailAuth(): any {
        return {
            user: this.envConfig.EMAIL_USER,
            // 这里密码不是qq密码，是你设置的smtp授权码
            pass: this.envConfig.EMAIL_PWD
        }
    }
}