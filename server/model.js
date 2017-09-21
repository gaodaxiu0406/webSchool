let mongoose = require('mongoose');
let conn = mongoose.createConnection('mongodb://127.0.0.1/imoocCrawl');
let ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.Promise = Promise;
let CourseListSchema = new mongoose.Schema({
    kind: String, //课程分类
    name: String,//课程名称
    img: String,//课程图片
    detailUrl: String,//课程详情的路径
    from: String, //来自哪个大学
    joinedNumber: Number, //参加的人数 
    progress: String, //课程进度
    // collection可以用来指定集合的名称,如果不通过collection指定集合的名称,那么会将模型的名称转小写,然后再变复数形式作为集合的名称
}, {
        collection: 'courselists'
    });
let CourseList = conn.model('CourseList', CourseListSchema);
exports.CourseList = CourseList;



let CourseKindSchema = new mongoose.Schema({
    kind: String,//课程分类
    linkTo: String,//课程跳转路径
    totalPage: Number,//当前分类数据总页数
}, {
        collection: 'coursekinds'
    });
let CourseKind = conn.model('CourseKind', CourseKindSchema);
exports.CourseKind = CourseKind;



let CourseContentSchema = new mongoose.Schema({
    // courseid: {type:ObjectId,ref:'CourseList'},
    courseUrl: String,
    description: String,  //课程描述
    catalog: String   //课程目录 
}, {
        collection: 'coursecontents'
    });
let CourseContent = conn.model('CourseContent', CourseContentSchema);
exports.CourseContent = CourseContent;



let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
}, {
        collection: 'users'
    })
let User = conn.model('User', UserSchema);
exports.User = User;


let SubCourseSchema = new mongoose.Schema({
    username: String,
    course: { type: ObjectId, ref: 'CourseList' },
    createAt: { type: Date, default: Date.now() },
}, {
        collection: "subcourses"
    })
let SubCourse = conn.model('SubCourse', SubCourseSchema);
exports.SubCourse = SubCourse;