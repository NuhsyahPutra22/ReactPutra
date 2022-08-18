var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddAdminCourseForm = function (_React$Component) {
    _inherits(AddAdminCourseForm, _React$Component);

    function AddAdminCourseForm(props) {
        _classCallCheck(this, AddAdminCourseForm);

        var _this = _possibleConstructorReturn(this, (AddAdminCourseForm.__proto__ || Object.getPrototypeOf(AddAdminCourseForm)).call(this, props));

        _this.state = { coursecode: '' };
        _this.state = { coursename: '' };
        _this.state = { courseabbrev: '' };

        _this.handleChange1 = _this.handleChange1.bind(_this);
        _this.handleChange2 = _this.handleChange2.bind(_this);
        _this.handleChange3 = _this.handleChange3.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    _createClass(AddAdminCourseForm, [{
        key: 'handleChange1',
        value: function handleChange1(event) {
            this.setState({ coursecode: event.target.value });
        }
    }, {
        key: 'handleChange2',
        value: function handleChange2(event) {
            this.setState({ coursename: event.target.value });
        }
    }, {
        key: 'handleChange3',
        value: function handleChange3(event) {
            this.setState({ courseabbrev: event.target.value });
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            alert(this.state.coursename);
            var a = this.state.coursecode;
            var b = this.state.coursename;
            var c = this.state.courseabbrev;
            var data = {
                coursecode: a,
                coursename: b,
                courseabbrev: c

            };
            var headers = { 'Content-Type': 'application/json' };
            axios.post('http://localhost:3000/Course', data, { headers: headers }).then(function (response) {
                if (response.status === 201) {
                    console.log("Success!");
                    alert("success");
                    location.reload();
                } else {
                    alert("error");
                }
            });
            event.preventDefault();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'form',
                { onSubmit: this.handleSubmit },
                React.createElement(
                    'p',
                    { 'class': 'h1 text-center' },
                    'Add Course:'
                ),
                React.createElement(
                    'div',
                    { 'class': 'form-group' },
                    React.createElement(
                        'label',
                        null,
                        'coursecode:',
                        React.createElement('input', { type: 'text', value: this.state.coursecode, onChange: this.handleChange1 })
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'form-group' },
                    React.createElement(
                        'label',
                        null,
                        'coursename:',
                        React.createElement('input', { type: 'text', value: this.state.coursename, onChange: this.handleChange2 })
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'form-group' },
                    React.createElement(
                        'label',
                        null,
                        'courseabbrev:',
                        React.createElement('input', { type: 'text', value: this.state.courseabbrev, onChange: this.handleChange3 })
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'form-group' },
                    React.createElement('input', { 'class': 'bg-success', type: 'submit', value: 'Submit' })
                )
            );
        }
    }]);

    return AddAdminCourseForm;
}(React.Component);

var DisplayAdminCourse = function (_React$Component2) {
    _inherits(DisplayAdminCourse, _React$Component2);

    function DisplayAdminCourse(props) {
        _classCallCheck(this, DisplayAdminCourse);

        var _this2 = _possibleConstructorReturn(this, (DisplayAdminCourse.__proto__ || Object.getPrototypeOf(DisplayAdminCourse)).call(this, props));

        _this2.state = {
            Users: []
        };
        return _this2;
    }

    _createClass(DisplayAdminCourse, [{
        key: 'getCourseinfo',
        value: function getCourseinfo() {
            var _this3 = this;

            axios.get('http://localhost:3000/Course', {}).then(function (res) {
                var data = res.data;
                console.log(data);
                var mystyle = {
                    transition: "0.3s",
                    width: "40%",
                    "box-shadow": "0 4px 8px 0 rgba(0,0,0,0.2)",
                    "border-radius": "5px"
                };

                var id = sessionStorage.getItem("userid");

                var courses = data.result.map(function (c) {
                    return React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'td',
                            null,
                            c.coursecode
                        ),
                        React.createElement(
                            'td',
                            null,
                            c.coursename
                        ),
                        React.createElement(
                            'td',
                            null,
                            c.courseabbrev
                        ),
                        React.createElement(
                            'td',
                            null,
                            React.createElement(
                                'button',
                                { 'class': 'bg-success', onClick: function onClick(e) {
                                        return _this3.UpdateRow(c.courseid, e);
                                    } },
                                'Update'
                            )
                        ),
                        React.createElement(
                            'td',
                            null,
                            React.createElement(
                                'button',
                                { 'class': 'bg-danger', onClick: function onClick(e) {
                                        return _this3.deleteRow(c.courseid, e);
                                    } },
                                'delete'
                            )
                        )
                    );
                });
                _this3.setState({
                    courses: courses
                });
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, {
        key: 'deleteRow',
        value: function deleteRow(courseid, e) {
            axios.delete('http://localhost:3000/Course/' + courseid).then(function (res) {
                console.log(res);
                console.log(res.data);
                console.log("Successfully Deleted Courseinfo!");
                alert("successfully Deleted Courseinfo");
                location.reload();
            });
        }
    }, {
        key: 'UpdateRow',
        value: function UpdateRow(courseid, e) {
            axios.put('http://localhost:3000/Course/' + courseid).then(function (res) {
                console.log(res);
                console.log(res.data);
                console.log("Successfully Updated Courseinfo!");
                alert("successfully Updated Courseinfo");
                location.reload();
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getCourseinfo();
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'table',
                    { className: 'table table-dark' },
                    React.createElement(
                        'thead',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'th',
                                null,
                                'coursecode'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'coursename'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'courseabbrev'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Update'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Delete'
                            )
                        )
                    ),
                    React.createElement(
                        'tbody',
                        null,
                        this.state.courses
                    )
                )
            );
        }
    }]);

    return DisplayAdminCourse;
}(React.Component);

var Footer = function (_React$Component3) {
    _inherits(Footer, _React$Component3);

    function Footer() {
        _classCallCheck(this, Footer);

        return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
    }

    _createClass(Footer, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h3',
                    null,
                    'Singapore Polytechnic'
                ),
                React.createElement(
                    'p',
                    null,
                    '500 Dover Road Singapore 139651'
                )
            );
        }
    }]);

    return Footer;
}(React.Component);

window.addEventListener('DOMContentLoaded', function () {

    var root = ReactDOM.createRoot(document.getElementById('root-admincourse'));
    var root2 = ReactDOM.createRoot(document.getElementById('addadmincourseform'));
    var root3 = ReactDOM.createRoot(document.getElementById('footer'));
    var element = React.createElement(DisplayAdminCourse, null);
    var element2 = React.createElement(AddAdminCourseForm, null);
    var element3 = React.createElement(Footer, null);
    root.render(element);
    root2.render(element2);
    root3.render(element3);
});