import {catchAsyncError} from "../utils/errorHandle";
import Role from '../model/roleModel'

// 创建角色
export const createRole = catchAsyncError(async (req, res) => {
    const role = await Role.create(req.body);

    res.status(200).json({
        msg: '角色创建成功',
        role: role
    })
})

// 删除角色
export const deleteRole = catchAsyncError(async (req, res) => {
    const role = await Role.findByIdAndDelete(req.params.id);

    res.status(200).json({
        msg: '角色删除成功',
        role: role
    })
})
