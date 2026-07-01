import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    },

    title:{
        type:String,
        required:true,
        trim:true
    },

    message:{
        type:String,
        required:true
    },

    type:{
        type:String,
        enum:[
            "Workout",
            "Nutrition",
            "Challenge",
            "Achievement",
            "Reminder",
            "Progress",
            "AI",
            "Telegram",
            "Premium",
            "System"
        ],
        default:"System"
    },

    priority:{
        type:String,
        enum:[
            "Low",
            "Normal",
            "High",
            "Urgent"
        ],
        default:"Normal"
    },

    icon:{
        type:String,
        default:""
    },

    image:{
        type:String,
        default:""
    },

    action:{
        type:String,
        default:""
    },

    actionUrl:{
        type:String,
        default:""
    },

    read:{
        type:Boolean,
        default:false
    },

    sent:{
        type:Boolean,
        default:false
    },

    telegramSent:{
        type:Boolean,
        default:false
    },

    pushSent:{
        type:Boolean,
        default:false
    },

    emailSent:{
        type:Boolean,
        default:false
    },

    scheduledAt:{
        type:Date
    },

    expiresAt:{
        type:Date
    },

    metadata:{
        type:mongoose.Schema.Types.Mixed,
        default:{}
    }

},
{
    timestamps:true
});

notificationSchema.index({
    user:1,
    read:1
});

notificationSchema.index({
    scheduledAt:1
});

notificationSchema.index({
    expiresAt:1
});

export default mongoose.model(
    "Notification",
    notificationSchema
);
