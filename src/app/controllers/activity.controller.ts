import { Controller, Query, Get } from "@nestjs/common";
import { GetActivityListParms } from "../interfaces/parms.interface";
import { ActivityService } from "../services/activity.service";
import { Roles, VerifyToken } from "../decorators/common.decorator";
@Controller('activity')
export class ActivityController {
    constructor(private readonly activityService: ActivityService) {

    }
    /**获取推荐列表 */
    @Get("GetActivityList")
    @VerifyToken(true)
    async GetActivityList(@Query() parms: GetActivityListParms): Promise<any> {
        let pageIndex = Number(parms.pageIndex)
        let data = await this.activityService.getActivityList(pageIndex)
        return { code: 200, msg: 'success', data }
    }
}