import { IActivityService } from "../interfaces/activity-service.interace";
import { Injectable } from "@nestjs/common";
import { Activity } from "src/entities/activity.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
/**activity 数据服务层 */
@Injectable()
export class ActivityService implements IActivityService {

    constructor(@InjectRepository(Activity)
    private readonly ActivityRepository: Repository<Activity>) {

    }
    /**分页获取推荐列表 */
    async getActivityList(pageIndex: number, pageSize: number = 10): Promise<Activity[]> {
        let skip = (pageIndex - 1) * pageSize
        let take = pageSize
        let data = await this.ActivityRepository.find({
            relations: ["user"],
            // select: ["id"],
            skip,
            take,
            order: {
                id: "DESC"
            },
            cache: true
        });
        console.log("---请求列表数据")
        return data;
    }
    /**添加活动 */
    async addActivity(_activity: Activity): Promise<Activity> {
        _activity.created_at = new Date();
        return await this.ActivityRepository.save(_activity);
    }

}