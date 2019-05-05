import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from 'joi';

export interface EnvConfig {
    [prop: string]: string;
}

export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(filePath: string) {
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
}