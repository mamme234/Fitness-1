import mongoose from "mongoose";

const nutritionSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
        trim:true,
        index:true
    },

    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },

    category:{
        type:String,
        enum:[
            "Breakfast",
            "Lunch",
            "Dinner",
            "Snack",
            "Pre Workout",
            "Post Workout",
            "Supplement",
            "Drink"
        ],
        default:"Breakfast"
    },

    mealType:{
        type:String,
        enum:[
            "Weight Loss",
            "Muscle Gain",
            "Maintenance",
            "Bulking",
            "Cutting",
            "Ramadan",
            "Vegetarian",
            "Vegan"
        ],
        default:"Muscle Gain"
    },

    description:{
        type:String,
        default:""
    },

    image:{
        type:String,
        default:""
    },

    servingSize:{
        type:String,
        default:"100 g"
    },

    calories:{
        type:Number,
        required:true
    },

    protein:{
        type:Number,
        default:0
    },

    carbs:{
        type:Number,
        default:0
    },

    fats:{
        type:Number,
        default:0
    },

    fiber:{
        type:Number,
        default:0
    },

    sugar:{
        type:Number,
        default:0
    },

    sodium:{
        type:Number,
        default:0
    },

    cholesterol:{
        type:Number,
        default:0
    },

    potassium:{
        type:Number,
        default:0
    },

    ingredients:[
        {
            type:String
        }
    ],

    preparation:[
        {
            type:String
        }
    ],

    benefits:[
        {
            type:String
        }
    ],

    vitamins:[
        {
            type:String
        }
    ],

    minerals:[
        {
            type:String
        }
    ],

    recommendedFor:[
        {
            type:String
        }
    ],

    allergies:[
        {
            type:String
        }
    ],

    halal:{
        type:Boolean,
        default:true
    },

    premium:{
        type:Boolean,
        default:false
    },

    featured:{
        type:Boolean,
        default:false
    },

    rating:{
        type:Number,
        default:5
    },

    views:{
        type:Number,
        default:0
    },

    active:{
        type:Boolean,
        default:true
    }

},
{
    timestamps:true
}
);

nutritionSchema.index({
    name:"text",
    description:"text",
    category:"text"
});

export default mongoose.model("Nutrition", nutritionSchema);
