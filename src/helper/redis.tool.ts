
import { RedisService } from 'nestjs-redis';
import * as Redis from "ioredis";

let redis_static: Redis.Redis = null;
export class RedisTool {
    constructor(private readonly redisService: RedisService) {
        if (redis_static == null) {
            redis_static = this.redisService.getClient();
        }
    }
    get getClient(): Redis.Redis {
        return redis_static;
    }
}
