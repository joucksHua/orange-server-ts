import { Controller, Query, Get, Body, Post } from "@nestjs/common";
import { GetActivityListParms } from "../interfaces/parms.interface";
import { ActivityService } from "../services/activity.service";
import { Roles, VerifyToken } from "../decorators/common.decorator";
import { Activity } from "src/entities/activity.entity";
import { UsersService } from "../services/users.service";
@Controller('activity')
export class ActivityController {
    constructor(private readonly activityService: ActivityService,
        private readonly userService: UsersService) {

    }
    /**获取推荐列表 */
    @Get("GetActivityList")
    @VerifyToken()
    async GetActivityList(@Query() parms: GetActivityListParms): Promise<any> {
        let pageIndex = Number(parms.pageIndex)
        let data = await this.activityService.getActivityList(pageIndex)
        return { code: 200, msg: 'success', data }
    }
    /**添加一条活动 */
    @Post("addActivity")
    @VerifyToken()
    async addActivity(@Body() parms: Activity): Promise<any> {
        let user = await this.userService.findOne(parms.user.id);
        let data = await this.activityService.addActivity(parms);
        return { code: 200, msg: "success", data }
    }
}