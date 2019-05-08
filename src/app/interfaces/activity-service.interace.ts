
import { Activity } from '../../entities/activity.entity';
export interface IActivityService {
    /**分页获取推荐 */
    getActivityList(pageIndex: number, pageSize: number): Promise<Activity[]>;
}