"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");
var dbconnector_1 = require("./src/dbconfig/dbconnector");
var app = express();
process.env.DATABASE_URL = "postgres://postgres:Rock921Mach521%40@localhost:5432/itsm";
process.env.JWT_SECRET = "my_secret";
// Connect to the database
// const connection = pg.createConnection(process.env.DATABASE_URL);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// Create a user model
var User = {
    id: {
        type: 'integer',
        primaryKey: true
    },
    email: {
        type: 'string',
        unique: true
    },
    password: {
        type: 'string'
    }
};
// Create a user repository
// const userRepository = connection.getRepository(User);
// Create a signup route
app.post('/signup', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var client, _a, name_1, email, password, existingUser, hashedPassword, user, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                return [4 /*yield*/, dbconnector_1["default"].connect()];
            case 1:
                client = _b.sent();
                _a = req.body, name_1 = _a.name, email = _a.email, password = _a.password;
                console.log(req.body.email);
                return [4 /*yield*/, client.query("SELECT * FROM users WHERE email='".concat(email, "'"))];
            case 2:
                existingUser = _b.sent();
                console.log(existingUser);
                if (existingUser.rows.length) {
                    return [2 /*return*/, res.status(400).send('Email already exists')];
                }
                return [4 /*yield*/, bcrypt.hash(password, 10)];
            case 3:
                hashedPassword = _b.sent();
                return [4 /*yield*/, client.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name_1, email, hashedPassword])];
            case 4:
                user = _b.sent();
                token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
                // Set the JWT token in the response
                res.status(201).json({
                    token: token
                });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                console.log(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// Create a login route
app.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var client, _a, email, password, user, isPasswordValid, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                return [4 /*yield*/, dbconnector_1["default"].connect()];
            case 1:
                client = _b.sent();
                console.log(req.body);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, client.query("SELECT * FROM users WHERE email='".concat(email, "'"))];
            case 2:
                user = _b.sent();
                console.log(user.rows[0].password);
                if (!user) {
                    return [2 /*return*/, res.status(401).send('Invalid email or password')];
                }
                return [4 /*yield*/, bcrypt.compare(password, user.rows[0].password)];
            case 3:
                isPasswordValid = _b.sent();
                console.log(isPasswordValid);
                if (!isPasswordValid) {
                    return [2 /*return*/, res.status(401).send('Invalid email or password')];
                }
                token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
                // Set the JWT token in the response
                res.status(200).json({
                    token: token
                });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                console.log(error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Create a protected route
app.get('/protected', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decoded;
    var _a;
    return __generator(this, function (_b) {
        token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split('Bearer ')[1];
        if (!token) {
            return [2 /*return*/, res.status(401).send('Unauthorized')];
        }
        // Verify the JWT token
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            // The user is authenticated, so we can proceed
            // TODO: decoded.iat can be used to validate the token created time for additional security
            res.send('Hello, ' + JSON.stringify(decoded));
        }
        catch (error) {
            return [2 /*return*/, res.status(401).send('Unauthorized')];
        }
        return [2 /*return*/];
    });
}); });
// Start the server
app.listen(3000, function () {
    console.log('App is listening on port 3000');
});
