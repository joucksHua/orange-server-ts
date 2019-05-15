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
        for (const item of data) {
            item.img_mainAxisCellCount = this.getImgMainAxisCellFun(item.img_height);
        }
        return data;
    }
    /**添加活动 */
    async addActivity(_activity: Activity): Promise<Activity> {
        _activity.created_at = new Date();
        return await this.ActivityRepository.save(_activity);
    }
    /**根据高度分配axiscellcount */
    private getImgMainAxisCellFun(num: number): number {
        if (num <= 100) {
            return 1.3;
        }
        else if (num <= 150) {
            return 1.6;
        }
        else if (num <= 200) {
            return 1.7;
        }
        else if (num <= 250) {
            return 2;
        }
        else if (num <= 300) {
            return 2.2;
        }
        else if (num <= 350) {
            return 2.3;
        }
        else if (num <= 400) {
            return 2.5;
        }
        else if (num <= 500) {
            return 2.6;
        }
        else if (num <= 600) {
            return 2.65;
        }
        else if (num <= 1700) {
            return 3;
        }
        else if (num <= 2000) {
            return 4.2;
        } else if (num <= 2400) {
            return 5;
        } else {
            return 6
        }
    }
}