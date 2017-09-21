let path = require('path');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let express = require('express');
let app = express();
let session = require('express-session');
let mongoStore = require('connect-mongo')(session);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());//将数据转换成对象放到req.body上
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'hf',
    store: new mongoStore({
        url: 'mongodb://localhost:27017/imoocCrawl'
    })
}));
app.all('*', function (req, res, next) {
    if( req.headers.origin == 'http://localhost:8080' || 'http://47.93.47.208:5001' || 'http://ihufei.xin:5001' || 'http://www.ihufei.xin:5001'){
        res.header("Access-Control-Allow-Origin", req.headers.origin);//允许前端webpack的8080端口访问
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");//允许接收的头
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");//允许的方法
        res.header('Access-Control-Allow-Credentials', 'true')//允许跨域设置cookie
        res.header("X-Powered-By", ' 3.2.1')
        //如果发的是options的请求 响应ok 即可
        if (req.method == "OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
        else next();
    }
});

let { CourseList, CourseContent, User, SubCourse } = require('./model');

// 获取课程列表  需要提供type  limit  offset
app.get('/getLesson/:type/:limit/:offset', (req, res) => {
    console.log('获取课程列表');
    let { type, limit, offset } = req.params;
    console.log(type, limit, offset);
    let kind = type == 'all' ? {} : { kind: type }
    CourseList.find(kind)
        .sort({ joinedNumber: -1 })
        .skip(offset - 0)
        .limit(limit - 0)
        .exec((err, docs) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(docs);
                res.json(docs);
            }
        })
})

// 获取课程详情
app.get('/getLessonDetail', (req, res) => {
    console.log('获取课程详情');
    let { detailUrl } = req.query;
    console.log(detailUrl);
    CourseContent.findOne({ courseUrl: detailUrl }, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(doc);
            res.json(doc);
        }
    })
})

//给密码加密
let crypto = require('crypto');
let md5 = (val) => {
    return crypto.createHash('md5').update(val).digest('hex');
}
// 注册
app.post('/reg', (req, res) => {
    console.log('开始注册');
    let { username, password } = req.body;
    password = md5(password);
    User.findOne({ username }).then((doc) => {
        if (doc) {
            res.json({ error: '当前用户名已经被注册' });
        } else {
            User.create({ username, password }).then((doc) => {
                req.session.user = doc;
                res.json(req.session.user);
            })
        }
    })
})

// 验证登录状态
app.get('/auth', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);//req.session.user存在,登录了
    } else {
        res.json({});//没登录,返回空,前台把userInfo置为{}
    }
})

// 登录
app.post('/login', (req, res) => {
    console.log('开始登录');
    let { username, password } = req.body;
    password = md5(password);
    console.log(username, password);
    User.findOne({ username, password }).then((doc) => {
        if (doc) {
            req.session.user = doc;
            res.json(req.session.user);
        } else {
            res.json({ error: "用户名或密码错误,请重新登录!" })
        }
    })
})

// 注销登录
app.get('/logout', (req, res) => {
    // 把session的user属性变成null,就变成了未登录状态
    console.log('注销登录');
    req.session.user = null;
    res.json({});
})

// 订阅课程
app.get('/subscibe/:lessonid', (req, res) => {
    console.log('订阅课程');
    let { lessonid } = req.params;
    if (req.session.user) {
        // 登录了
        let username = req.session.user.username;
        SubCourse.findOne({
            username,
            course: lessonid
        }).then(doc => {
            // 找到了说明已经订阅过了
            if (doc) {
                res.json({ error: "您已经订阅过该课程了!" });
            } else {
                SubCourse.create({
                    username,
                    course: lessonid
                }).then((doc) => {
                    // update指更新,参数1是更新的条件,参数2是更新后的值
                    // 将_id为lessonid的joinedNumber增加1
                    CourseList.update({_id:lessonid},{$inc:{joinedNumber:1}}).then((result)=>{
                        console.log(result);
                    });
                    res.json({
                        success: "订阅成功!",
                        lesson: doc
                    })
                })   
                             
            }
        })

    } else {
        res.json({
            error: "您还未登录,请登录后再订阅课程!"
        })
    }
})

// 获取订阅课程列表
app.get('/subLessonList', (req, res) => {
    console.log('获取订阅列表');
    if (req.session.user) {
        // 登录了
        let username = req.session.user.username;
        SubCourse.find({ username })
            .sort({ createAt: -1 })
            .populate('course')
            .exec()
            .then(docs => {
                res.json(docs);
            })
    }
})


app.listen('3000', () => {
    console.log('running at http://localhost:3000');
})