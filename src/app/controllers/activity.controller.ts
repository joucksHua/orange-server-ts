import { Controller, Query, Get, Body, Post } from "@nestjs/common";
import { GetActivityListParms } from "../interfaces/parms.interface";
import { ActivityService } from "../services/activity.service";
import { Roles, VerifyToken } from "../decorators/common.decorator";
import { Activity } from "src/entities/activity.entity";
import { UsersService } from "../services/users.service";
import { User } from "src/entities/user.entity";
import { LikeWorks } from "src/entities/likeWorks.entity";
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
        console.log('1111111111111111111111', data)
        data.forEach(item => {
            item.img_url = "http://192.168.31.91:8200" + item.img_url.substr(item.img_url.indexOf("/img"))
            console.log(item.img_url)
        })
        return { code: 200, msg: 'success', data }
    }
    /**添加一条活动 */
    @Post("addActivity")
    @VerifyToken()
    async addActivity(@Body() parms: Activity): Promise<any> {
        let user = await this.userService.findOne(parms.user.id);
        parms.user = user;
        let data = await this.activityService.addActivity(parms);
        return { code: 200, msg: "success", data }
    }
    /**点赞作品 */
    @Post("likeWorks")
    @VerifyToken()
    async likeActivity(@Body() parms: LikeWorks): Promise<any> {
        let _activity = await this.activityService.findById(parms.activity.id)
        _activity.like++;
        let result = await this.activityService.update(_activity);
        return { code: 200, msg: "success", data: result }
    }
}