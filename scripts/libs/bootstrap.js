/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 0.12.1 - 2015-02-20
 * License: MIT
 */
angular.module("ui.bootstrap", [
  "ui.bootstrap.tpls",
  "ui.bootstrap.transition",
  "ui.bootstrap.collapse",
  "ui.bootstrap.accordion",
  "ui.bootstrap.alert",
  "ui.bootstrap.bindHtml",
  "ui.bootstrap.buttons",
  "ui.bootstrap.carousel",
  "ui.bootstrap.dateparser",
  "ui.bootstrap.position",
  "ui.bootstrap.datepicker",
  "ui.bootstrap.dropdown",
  "ui.bootstrap.modal",
  "ui.bootstrap.pagination",
  "ui.bootstrap.tooltip",
  "ui.bootstrap.popover",
  "ui.bootstrap.progressbar",
  "ui.bootstrap.rating",
  "ui.bootstrap.tabs",
  "ui.bootstrap.timepicker",
  "ui.bootstrap.typeahead",
]),
  angular.module("ui.bootstrap.tpls", [
    "template/accordion/accordion-group.html",
    "template/accordion/accordion.html",
    "template/alert/alert.html",
    "template/carousel/carousel.html",
    "template/carousel/slide.html",
    "template/datepicker/datepicker.html",
    "template/datepicker/day.html",
    "template/datepicker/month.html",
    "template/datepicker/popup.html",
    "template/datepicker/year.html",
    "template/modal/backdrop.html",
    "template/modal/window.html",
    "template/pagination/pager.html",
    "template/pagination/pagination.html",
    "template/tooltip/tooltip-html-unsafe-popup.html",
    "template/tooltip/tooltip-popup.html",
    "template/popover/popover.html",
    "template/progressbar/bar.html",
    "template/progressbar/progress.html",
    "template/progressbar/progressbar.html",
    "template/rating/rating.html",
    "template/tabs/tab.html",
    "template/tabs/tabset.html",
    "template/timepicker/timepicker.html",
    "template/typeahead/typeahead-match.html",
    "template/typeahead/typeahead-popup.html",
  ]),
  angular.module("ui.bootstrap.transition", []).factory("$transition", [
    "$q",
    "$timeout",
    "$rootScope",
    function (a, b, c) {
      function d(a) {
        for (var b in a) if (void 0 !== f.style[b]) return a[b];
      }
      var e = function (d, f, g) {
          g = g || {};
          var h = a.defer(),
            i =
              e[
                g.animation ? "animationEndEventName" : "transitionEndEventName"
              ],
            j = function () {
              c.$apply(function () {
                d.unbind(i, j), h.resolve(d);
              });
            };
          return (
            i && d.bind(i, j),
            b(function () {
              angular.isString(f)
                ? d.addClass(f)
                : angular.isFunction(f)
                ? f(d)
                : angular.isObject(f) && d.css(f),
                i || h.resolve(d);
            }),
            (h.promise.cancel = function () {
              i && d.unbind(i, j), h.reject("Transition cancelled");
            }),
            h.promise
          );
        },
        f = document.createElement("trans"),
        g = {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd",
          transition: "transitionend",
        },
        h = {
          WebkitTransition: "webkitAnimationEnd",
          MozTransition: "animationend",
          OTransition: "oAnimationEnd",
          transition: "animationend",
        };
      return (
        (e.transitionEndEventName = d(g)), (e.animationEndEventName = d(h)), e
      );
    },
  ]),
  angular
    .module("ui.bootstrap.collapse", ["ui.bootstrap.transition"])
    .directive("collapse", [
      "$transition",
      function (a) {
        return {
          link: function (b, c, d) {
            function e(b) {
              function d() {
                j === e && (j = void 0);
              }
              var e = a(c, b);
              return j && j.cancel(), (j = e), e.then(d, d), e;
            }
            function f() {
              k
                ? ((k = !1), g())
                : (c.removeClass("collapse").addClass("collapsing"),
                  e({ height: c[0].scrollHeight + "px" }).then(g));
            }
            function g() {
              c.removeClass("collapsing"),
                c.addClass("collapse in"),
                c.css({ height: "auto" });
            }
            function h() {
              if (k) (k = !1), i(), c.css({ height: 0 });
              else {
                c.css({ height: c[0].scrollHeight + "px" });
                {
                  c[0].offsetWidth;
                }
                c.removeClass("collapse in").addClass("collapsing"),
                  e({ height: 0 }).then(i);
              }
            }
            function i() {
              c.removeClass("collapsing"), c.addClass("collapse");
            }
            var j,
              k = !0;
            b.$watch(d.collapse, function (a) {
              a ? h() : f();
            });
          },
        };
      },
    ]),
  angular
    .module("ui.bootstrap.accordion", ["ui.bootstrap.collapse"])
    .constant("accordionConfig", { closeOthers: !0 })
    .controller("AccordionController", [
      "$scope",
      "$attrs",
      "accordionConfig",
      function (a, b, c) {
        (this.groups = []),
          (this.closeOthers = function (d) {
            var e = angular.isDefined(b.closeOthers)
              ? a.$eval(b.closeOthers)
              : c.closeOthers;
            e &&
              angular.forEach(this.groups, function (a) {
                a !== d && (a.isOpen = !1);
              });
          }),
          (this.addGroup = function (a) {
            var b = this;
            this.groups.push(a),
              a.$on("$destroy", function () {
                b.removeGroup(a);
              });
          }),
          (this.removeGroup = function (a) {
            var b = this.groups.indexOf(a);
            -1 !== b && this.groups.splice(b, 1);
          });
      },
    ])
    .directive("accordion", function () {
      return {
        restrict: "EA",
        controller: "AccordionController",
        transclude: !0,
        replace: !1,
        templateUrl: "template/accordion/accordion.html",
      };
    })
    .directive("accordionGroup", function () {
      return {
        require: "^accordion",
        restrict: "EA",
        transclude: !0,
        replace: !0,
        templateUrl: "template/accordion/accordion-group.html",
        scope: { heading: "@", isOpen: "=?", isDisabled: "=?" },
        controller: function () {
          this.setHeading = function (a) {
            this.heading = a;
          };
        },
        link: function (a, b, c, d) {
          d.addGroup(a),
            a.$watch("isOpen", function (b) {
              b && d.closeOthers(a);
            }),
            (a.toggleOpen = function () {
              a.isDisabled || (a.isOpen = !a.isOpen);
            });
        },
      };
    })
    .directive("accordionHeading", function () {
      return {
        restrict: "EA",
        transclude: !0,
        template: "",
        replace: !0,
        require: "^accordionGroup",
        link: function (a, b, c, d, e) {
          d.setHeading(e(a, function () {}));
        },
      };
    })
    .directive("accordionTransclude", function () {
      return {
        require: "^accordionGroup",
        link: function (a, b, c, d) {
          a.$watch(
            function () {
              return d[c.accordionTransclude];
            },
            function (a) {
              a && (b.html(""), b.append(a));
            }
          );
        },
      };
    }),
  angular
    .module("ui.bootstrap.alert", [])
    .controller("AlertController", [
      "$scope",
      "$attrs",
      function (a, b) {
        (a.closeable = "close" in b), (this.close = a.close);
      },
    ])
    .directive("alert", function () {
      return {
        restrict: "EA",
        controller: "AlertController",
        templateUrl: "template/alert/alert.html",
        transclude: !0,
        replace: !0,
        scope: { type: "@", close: "&" },
      };
    })
    .directive("dismissOnTimeout", [
      "$timeout",
      function (a) {
        return {
          require: "alert",
          link: function (b, c, d, e) {
            a(function () {
              e.close();
            }, parseInt(d.dismissOnTimeout, 10));
          },
        };
      },
    ]),
  angular
    .module("ui.bootstrap.bindHtml", [])
    .directive("bindHtmlUnsafe", function () {
      return function (a, b, c) {
        b.addClass("ng-binding").data("$binding", c.bindHtmlUnsafe),
          a.$watch(c.bindHtmlUnsafe, function (a) {
            b.html(a || "");
          });
      };
    }),
  angular
    .module("ui.bootstrap.buttons", [])
    .constant("buttonConfig", { activeClass: "active", toggleEvent: "click" })
    .controller("ButtonsController", [
      "buttonConfig",
      function (a) {
        (this.activeClass = a.activeClass || "active"),
          (this.toggleEvent = a.toggleEvent || "click");
      },
    ])
    .directive("btnRadio", function () {
      return {
        require: ["btnRadio", "ngModel"],
        controller: "ButtonsController",
        link: function (a, b, c, d) {
          var e = d[0],
            f = d[1];
          (f.$render = function () {
            b.toggleClass(
              e.activeClass,
              angular.equals(f.$modelValue, a.$eval(c.btnRadio))
            );
          }),
            b.bind(e.toggleEvent, function () {
              var d = b.hasClass(e.activeClass);
              (!d || angular.isDefined(c.uncheckable)) &&
                a.$apply(function () {
                  f.$setViewValue(d ? null : a.$eval(c.btnRadio)), f.$render();
                });
            });
        },
      };
    })
    .directive("btnCheckbox", function () {
      return {
        require: ["btnCheckbox", "ngModel"],
        controller: "ButtonsController",
        link: function (a, b, c, d) {
          function e() {
            return g(c.btnCheckboxTrue, !0);
          }
          function f() {
            return g(c.btnCheckboxFalse, !1);
          }
          function g(b, c) {
            var d = a.$eval(b);
            return angular.isDefined(d) ? d : c;
          }
          var h = d[0],
            i = d[1];
          (i.$render = function () {
            b.toggleClass(h.activeClass, angular.equals(i.$modelValue, e()));
          }),
            b.bind(h.toggleEvent, function () {
              a.$apply(function () {
                i.$setViewValue(b.hasClass(h.activeClass) ? f() : e()),
                  i.$render();
              });
            });
        },
      };
    }),
  angular
    .module("ui.bootstrap.carousel", ["ui.bootstrap.transition"])
    .controller("CarouselController", [
      "$scope",
      "$timeout",
      "$interval",
      "$transition",
      function (a, b, c, d) {
        function e() {
          f();
          var b = +a.interval;
          !isNaN(b) && b > 0 && (h = c(g, b));
        }
        function f() {
          h && (c.cancel(h), (h = null));
        }
        function g() {
          var b = +a.interval;
          i && !isNaN(b) && b > 0 ? a.next() : a.pause();
        }
        var h,
          i,
          j = this,
          k = (j.slides = a.slides = []),
          l = -1;
        j.currentSlide = null;
        var m = !1;
        (j.select = a.select =
          function (c, f) {
            function g() {
              if (!m) {
                if (
                  j.currentSlide &&
                  angular.isString(f) &&
                  !a.noTransition &&
                  c.$element
                ) {
                  c.$element.addClass(f);
                  {
                    c.$element[0].offsetWidth;
                  }
                  angular.forEach(k, function (a) {
                    angular.extend(a, {
                      direction: "",
                      entering: !1,
                      leaving: !1,
                      active: !1,
                    });
                  }),
                    angular.extend(c, {
                      direction: f,
                      active: !0,
                      entering: !0,
                    }),
                    angular.extend(j.currentSlide || {}, {
                      direction: f,
                      leaving: !0,
                    }),
                    (a.$currentTransition = d(c.$element, {})),
                    (function (b, c) {
                      a.$currentTransition.then(
                        function () {
                          h(b, c);
                        },
                        function () {
                          h(b, c);
                        }
                      );
                    })(c, j.currentSlide);
                } else h(c, j.currentSlide);
                (j.currentSlide = c), (l = i), e();
              }
            }
            function h(b, c) {
              angular.extend(b, {
                direction: "",
                active: !0,
                leaving: !1,
                entering: !1,
              }),
                angular.extend(c || {}, {
                  direction: "",
                  active: !1,
                  leaving: !1,
                  entering: !1,
                }),
                (a.$currentTransition = null);
            }
            var i = k.indexOf(c);
            void 0 === f && (f = i > l ? "next" : "prev"),
              c &&
                c !== j.currentSlide &&
                (a.$currentTransition
                  ? (a.$currentTransition.cancel(), b(g))
                  : g());
          }),
          a.$on("$destroy", function () {
            m = !0;
          }),
          (j.indexOfSlide = function (a) {
            return k.indexOf(a);
          }),
          (a.next = function () {
            var b = (l + 1) % k.length;
            return a.$currentTransition ? void 0 : j.select(k[b], "next");
          }),
          (a.prev = function () {
            var b = 0 > l - 1 ? k.length - 1 : l - 1;
            return a.$currentTransition ? void 0 : j.select(k[b], "prev");
          }),
          (a.isActive = function (a) {
            return j.currentSlide === a;
          }),
          a.$watch("interval", e),
          a.$on("$destroy", f),
          (a.play = function () {
            i || ((i = !0), e());
          }),
          (a.pause = function () {
            a.noPause || ((i = !1), f());
          }),
          (j.addSlide = function (b, c) {
            (b.$element = c),
              k.push(b),
              1 === k.length || b.active
                ? (j.select(k[k.length - 1]), 1 == k.length && a.play())
                : (b.active = !1);
          }),
          (j.removeSlide = function (a) {
            var b = k.indexOf(a);
            k.splice(b, 1),
              k.length > 0 && a.active
                ? j.select(b >= k.length ? k[b - 1] : k[b])
                : l > b && l--;
          });
      },
    ])
    .directive("carousel", [
      function () {
        return {
          restrict: "EA",
          transclude: !0,
          replace: !0,
          controller: "CarouselController",
          require: "carousel",
          templateUrl: "template/carousel/carousel.html",
          scope: { interval: "=", noTransition: "=", noPause: "=" },
        };
      },
    ])
    .directive("slide", function () {
      return {
        require: "^carousel",
        restrict: "EA",
        transclude: !0,
        replace: !0,
        templateUrl: "template/carousel/slide.html",
        scope: { active: "=?" },
        link: function (a, b, c, d) {
          d.addSlide(a, b),
            a.$on("$destroy", function () {
              d.removeSlide(a);
            }),
            a.$watch("active", function (b) {
              b && d.select(a);
            });
        },
      };
    }),
  angular.module("ui.bootstrap.dateparser", []).service("dateParser", [
    "$locale",
    "orderByFilter",
    function (a, b) {
      function c(a) {
        var c = [],
          d = a.split("");
        return (
          angular.forEach(e, function (b, e) {
            var f = a.indexOf(e);
            if (f > -1) {
              (a = a.split("")), (d[f] = "(" + b.regex + ")"), (a[f] = "$");
              for (var g = f + 1, h = f + e.length; h > g; g++)
                (d[g] = ""), (a[g] = "$");
              (a = a.join("")), c.push({ index: f, apply: b.apply });
            }
          }),
          { regex: new RegExp("^" + d.join("") + "$"), map: b(c, "index") }
        );
      }
      function d(a, b, c) {
        return 1 === b && c > 28
          ? 29 === c && ((a % 4 === 0 && a % 100 !== 0) || a % 400 === 0)
          : 3 === b || 5 === b || 8 === b || 10 === b
          ? 31 > c
          : !0;
      }
      this.parsers = {};
      var e = {
        yyyy: {
          regex: "\\d{4}",
          apply: function (a) {
            this.year = +a;
          },
        },
        yy: {
          regex: "\\d{2}",
          apply: function (a) {
            this.year = +a + 2e3;
          },
        },
        y: {
          regex: "\\d{1,4}",
          apply: function (a) {
            this.year = +a;
          },
        },
        MMMM: {
          regex: a.DATETIME_FORMATS.MONTH.join("|"),
          apply: function (b) {
            this.month = a.DATETIME_FORMATS.MONTH.indexOf(b);
          },
        },
        MMM: {
          regex: a.DATETIME_FORMATS.SHORTMONTH.join("|"),
          apply: function (b) {
            this.month = a.DATETIME_FORMATS.SHORTMONTH.indexOf(b);
          },
        },
        MM: {
          regex: "0[1-9]|1[0-2]",
          apply: function (a) {
            this.month = a - 1;
          },
        },
        M: {
          regex: "[1-9]|1[0-2]",
          apply: function (a) {
            this.month = a - 1;
          },
        },
        dd: {
          regex: "[0-2][0-9]{1}|3[0-1]{1}",
          apply: function (a) {
            this.date = +a;
          },
        },
        d: {
          regex: "[1-2]?[0-9]{1}|3[0-1]{1}",
          apply: function (a) {
            this.date = +a;
          },
        },
        EEEE: { regex: a.DATETIME_FORMATS.DAY.join("|") },
        EEE: { regex: a.DATETIME_FORMATS.SHORTDAY.join("|") },
      };
      this.parse = function (b, e) {
        if (!angular.isString(b) || !e) return b;
        (e = a.DATETIME_FORMATS[e] || e),
          this.parsers[e] || (this.parsers[e] = c(e));
        var f = this.parsers[e],
          g = f.regex,
          h = f.map,
          i = b.match(g);
        if (i && i.length) {
          for (
            var j,
              k = { year: 1900, month: 0, date: 1, hours: 0 },
              l = 1,
              m = i.length;
            m > l;
            l++
          ) {
            var n = h[l - 1];
            n.apply && n.apply.call(k, i[l]);
          }
          return (
            d(k.year, k.month, k.date) &&
              (j = new Date(k.year, k.month, k.date, k.hours)),
            j
          );
        }
      };
    },
  ]),
  angular.module("ui.bootstrap.position", []).factory("$position", [
    "$document",
    "$window",
    function (a, b) {
      function c(a, c) {
        return a.currentStyle
          ? a.currentStyle[c]
          : b.getComputedStyle
          ? b.getComputedStyle(a)[c]
          : a.style[c];
      }
      function d(a) {
        return "static" === (c(a, "position") || "static");
      }
      var e = function (b) {
        for (var c = a[0], e = b.offsetParent || c; e && e !== c && d(e); )
          e = e.offsetParent;
        return e || c;
      };
      return {
        position: function (b) {
          var c = this.offset(b),
            d = { top: 0, left: 0 },
            f = e(b[0]);
          f != a[0] &&
            ((d = this.offset(angular.element(f))),
            (d.top += f.clientTop - f.scrollTop),
            (d.left += f.clientLeft - f.scrollLeft));
          var g = b[0].getBoundingClientRect();
          return {
            width: g.width || b.prop("offsetWidth"),
            height: g.height || b.prop("offsetHeight"),
            top: c.top - d.top,
            left: c.left - d.left,
          };
        },
        offset: function (c) {
          var d = c[0].getBoundingClientRect();
          return {
            width: d.width || c.prop("offsetWidth"),
            height: d.height || c.prop("offsetHeight"),
            top: d.top + (b.pageYOffset || a[0].documentElement.scrollTop),
            left: d.left + (b.pageXOffset || a[0].documentElement.scrollLeft),
          };
        },
        positionElements: function (a, b, c, d) {
          var e,
            f,
            g,
            h,
            i = c.split("-"),
            j = i[0],
            k = i[1] || "center";
          (e = d ? this.offset(a) : this.position(a)),
            (f = b.prop("offsetWidth")),
            (g = b.prop("offsetHeight"));
          var l = {
              center: function () {
                return e.left + e.width / 2 - f / 2;
              },
              left: function () {
                return e.left;
              },
              right: function () {
                return e.left + e.width;
              },
            },
            m = {
              center: function () {
                return e.top + e.height / 2 - g / 2;
              },
              top: function () {
                return e.top;
              },
              bottom: function () {
                return e.top + e.height;
              },
            };
          switch (j) {
            case "right":
              h = { top: m[k](), left: l[j]() };
              break;
            case "left":
              h = { top: m[k](), left: e.left - f };
              break;
            case "bottom":
              h = { top: m[j](), left: l[k]() };
              break;
            default:
              h = { top: e.top - g, left: l[k]() };
          }
          return h;
        },
      };
    },
  ]),
  angular
    .module("ui.bootstrap.datepicker", [
      "ui.bootstrap.dateparser",
      "ui.bootstrap.position",
    ])
    .constant("datepickerConfig", {
      formatDay: "dd",
      formatMonth: "MMMM",
      formatYear: "yyyy",
      formatDayHeader: "EEE",
      formatDayTitle: "MMMM yyyy",
      formatMonthTitle: "yyyy",
      datepickerMode: "day",
      minMode: "day",
      maxMode: "year",
      showWeeks: !0,
      startingDay: 0,
      yearRange: 20,
      minDate: null,
      maxDate: null,
    })
    .controller("DatepickerController", [
      "$scope",
      "$attrs",
      "$parse",
      "$interpolate",
      "$timeout",
      "$log",
      "dateFilter",
      "datepickerConfig",
      function (a, b, c, d, e, f, g, h) {
        var i = this,
          j = { $setViewValue: angular.noop };
        (this.modes = ["day", "month", "year"]),
          angular.forEach(
            [
              "formatDay",
              "formatMonth",
              "formatYear",
              "formatDayHeader",
              "formatDayTitle",
              "formatMonthTitle",
              "minMode",
              "maxMode",
              "showWeeks",
              "startingDay",
              "yearRange",
            ],
            function (c, e) {
              i[c] = angular.isDefined(b[c])
                ? 8 > e
                  ? d(b[c])(a.$parent)
                  : a.$parent.$eval(b[c])
                : h[c];
            }
          ),
          angular.forEach(["minDate", "maxDate"], function (d) {
            b[d]
              ? a.$parent.$watch(c(b[d]), function (a) {
                  (i[d] = a ? new Date(a) : null), i.refreshView();
                })
              : (i[d] = h[d] ? new Date(h[d]) : null);
          }),
          (a.datepickerMode = a.datepickerMode || h.datepickerMode),
          (a.uniqueId =
            "datepicker-" + a.$id + "-" + Math.floor(1e4 * Math.random())),
          (this.activeDate = angular.isDefined(b.initDate)
            ? a.$parent.$eval(b.initDate)
            : new Date()),
          (a.isActive = function (b) {
            return 0 === i.compare(b.date, i.activeDate)
              ? ((a.activeDateId = b.uid), !0)
              : !1;
          }),
          (this.init = function (a) {
            (j = a),
              (j.$render = function () {
                i.render();
              });
          }),
          (this.render = function () {
            if (j.$modelValue) {
              var a = new Date(j.$modelValue),
                b = !isNaN(a);
              b
                ? (this.activeDate = a)
                : f.error(
                    'Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.'
                  ),
                j.$setValidity("date", b);
            }
            this.refreshView();
          }),
          (this.refreshView = function () {
            if (this.element) {
              this._refreshView();
              var a = j.$modelValue ? new Date(j.$modelValue) : null;
              j.$setValidity(
                "date-disabled",
                !a || (this.element && !this.isDisabled(a))
              );
            }
          }),
          (this.createDateObject = function (a, b) {
            var c = j.$modelValue ? new Date(j.$modelValue) : null;
            return {
              date: a,
              label: g(a, b),
              selected: c && 0 === this.compare(a, c),
              disabled: this.isDisabled(a),
              current: 0 === this.compare(a, new Date()),
            };
          }),
          (this.isDisabled = function (c) {
            return (
              (this.minDate && this.compare(c, this.minDate) < 0) ||
              (this.maxDate && this.compare(c, this.maxDate) > 0) ||
              (b.dateDisabled &&
                a.dateDisabled({ date: c, mode: a.datepickerMode }))
            );
          }),
          (this.split = function (a, b) {
            for (var c = []; a.length > 0; ) c.push(a.splice(0, b));
            return c;
          }),
          (a.select = function (b) {
            if (a.datepickerMode === i.minMode) {
              var c = j.$modelValue
                ? new Date(j.$modelValue)
                : new Date(0, 0, 0, 0, 0, 0, 0);
              c.setFullYear(b.getFullYear(), b.getMonth(), b.getDate()),
                j.$setViewValue(c),
                j.$render();
            } else
              (i.activeDate = b),
                (a.datepickerMode =
                  i.modes[i.modes.indexOf(a.datepickerMode) - 1]);
          }),
          (a.move = function (a) {
            var b = i.activeDate.getFullYear() + a * (i.step.years || 0),
              c = i.activeDate.getMonth() + a * (i.step.months || 0);
            i.activeDate.setFullYear(b, c, 1), i.refreshView();
          }),
          (a.toggleMode = function (b) {
            (b = b || 1),
              (a.datepickerMode === i.maxMode && 1 === b) ||
                (a.datepickerMode === i.minMode && -1 === b) ||
                (a.datepickerMode =
                  i.modes[i.modes.indexOf(a.datepickerMode) + b]);
          }),
          (a.keys = {
            13: "enter",
            32: "space",
            33: "pageup",
            34: "pagedown",
            35: "end",
            36: "home",
            37: "left",
            38: "up",
            39: "right",
            40: "down",
          });
        var k = function () {
          e(
            function () {
              i.element[0].focus();
            },
            0,
            !1
          );
        };
        a.$on("datepicker.focus", k),
          (a.keydown = function (b) {
            var c = a.keys[b.which];
            if (c && !b.shiftKey && !b.altKey)
              if (
                (b.preventDefault(),
                b.stopPropagation(),
                "enter" === c || "space" === c)
              ) {
                if (i.isDisabled(i.activeDate)) return;
                a.select(i.activeDate), k();
              } else
                !b.ctrlKey || ("up" !== c && "down" !== c)
                  ? (i.handleKeyDown(c, b), i.refreshView())
                  : (a.toggleMode("up" === c ? 1 : -1), k());
          });
      },
    ])
    .directive("datepicker", function () {
      return {
        restrict: "EA",
        replace: !0,
        templateUrl: "template/datepicker/datepicker.html",
        scope: { datepickerMode: "=?", dateDisabled: "&" },
        require: ["datepicker", "?^ngModel"],
        controller: "DatepickerController",
        link: function (a, b, c, d) {
          var e = d[0],
            f = d[1];
          f && e.init(f);
        },
      };
    })
    .directive("daypicker", [
      "dateFilter",
      function (a) {
        return {
          restrict: "EA",
          replace: !0,
          templateUrl: "template/datepicker/day.html",
          require: "^datepicker",
          link: function (b, c, d, e) {
            function f(a, b) {
              return 1 !== b || a % 4 !== 0 || (a % 100 === 0 && a % 400 !== 0)
                ? i[b]
                : 29;
            }
            function g(a, b) {
              var c = new Array(b),
                d = new Date(a),
                e = 0;
              for (d.setHours(12); b > e; )
                (c[e++] = new Date(d)), d.setDate(d.getDate() + 1);
              return c;
            }
            function h(a) {
              var b = new Date(a);
              b.setDate(b.getDate() + 4 - (b.getDay() || 7));
              var c = b.getTime();
              return (
                b.setMonth(0),
                b.setDate(1),
                Math.floor(Math.round((c - b) / 864e5) / 7) + 1
              );
            }
            (b.showWeeks = e.showWeeks),
              (e.step = { months: 1 }),
              (e.element = c);
            var i = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            (e._refreshView = function () {
              var c = e.activeDate.getFullYear(),
                d = e.activeDate.getMonth(),
                f = new Date(c, d, 1),
                i = e.startingDay - f.getDay(),
                j = i > 0 ? 7 - i : -i,
                k = new Date(f);
              j > 0 && k.setDate(-j + 1);
              for (var l = g(k, 42), m = 0; 42 > m; m++)
                l[m] = angular.extend(e.createDateObject(l[m], e.formatDay), {
                  secondary: l[m].getMonth() !== d,
                  uid: b.uniqueId + "-" + m,
                });
              b.labels = new Array(7);
              for (var n = 0; 7 > n; n++)
                b.labels[n] = {
                  abbr: a(l[n].date, e.formatDayHeader),
                  full: a(l[n].date, "EEEE"),
                };
              if (
                ((b.title = a(e.activeDate, e.formatDayTitle)),
                (b.rows = e.split(l, 7)),
                b.showWeeks)
              ) {
                b.weekNumbers = [];
                for (
                  var o = h(b.rows[0][0].date), p = b.rows.length;
                  b.weekNumbers.push(o++) < p;

                );
              }
            }),
              (e.compare = function (a, b) {
                return (
                  new Date(a.getFullYear(), a.getMonth(), a.getDate()) -
                  new Date(b.getFullYear(), b.getMonth(), b.getDate())
                );
              }),
              (e.handleKeyDown = function (a) {
                var b = e.activeDate.getDate();
                if ("left" === a) b -= 1;
                else if ("up" === a) b -= 7;
                else if ("right" === a) b += 1;
                else if ("down" === a) b += 7;
                else if ("pageup" === a || "pagedown" === a) {
                  var c = e.activeDate.getMonth() + ("pageup" === a ? -1 : 1);
                  e.activeDate.setMonth(c, 1),
                    (b = Math.min(
                      f(e.activeDate.getFullYear(), e.activeDate.getMonth()),
                      b
                    ));
                } else
                  "home" === a
                    ? (b = 1)
                    : "end" === a &&
                      (b = f(
                        e.activeDate.getFullYear(),
                        e.activeDate.getMonth()
                      ));
                e.activeDate.setDate(b);
              }),
              e.refreshView();
          },
        };
      },
    ])
    .directive("monthpicker", [
      "dateFilter",
      function (a) {
        return {
          restrict: "EA",
          replace: !0,
          templateUrl: "template/datepicker/month.html",
          require: "^datepicker",
          link: function (b, c, d, e) {
            (e.step = { years: 1 }),
              (e.element = c),
              (e._refreshView = function () {
                for (
                  var c = new Array(12), d = e.activeDate.getFullYear(), f = 0;
                  12 > f;
                  f++
                )
                  c[f] = angular.extend(
                    e.createDateObject(new Date(d, f, 1), e.formatMonth),
                    { uid: b.uniqueId + "-" + f }
                  );
                (b.title = a(e.activeDate, e.formatMonthTitle)),
                  (b.rows = e.split(c, 3));
              }),
              (e.compare = function (a, b) {
                return (
                  new Date(a.getFullYear(), a.getMonth()) -
                  new Date(b.getFullYear(), b.getMonth())
                );
              }),
              (e.handleKeyDown = function (a) {
                var b = e.activeDate.getMonth();
                if ("left" === a) b -= 1;
                else if ("up" === a) b -= 3;
                else if ("right" === a) b += 1;
                else if ("down" === a) b += 3;
                else if ("pageup" === a || "pagedown" === a) {
                  var c =
                    e.activeDate.getFullYear() + ("pageup" === a ? -1 : 1);
                  e.activeDate.setFullYear(c);
                } else "home" === a ? (b = 0) : "end" === a && (b = 11);
                e.activeDate.setMonth(b);
              }),
              e.refreshView();
          },
        };
      },
    ])
    .directive("yearpicker", [
      "dateFilter",
      function () {
        return {
          restrict: "EA",
          replace: !0,
          templateUrl: "template/datepicker/year.html",
          require: "^datepicker",
          link: function (a, b, c, d) {
            function e(a) {
              return parseInt((a - 1) / f, 10) * f + 1;
            }
            var f = d.yearRange;
            (d.step = { years: f }),
              (d.element = b),
              (d._refreshView = function () {
                for (
                  var b = new Array(f),
                    c = 0,
                    g = e(d.activeDate.getFullYear());
                  f > c;
                  c++
                )
                  b[c] = angular.extend(
                    d.createDateObject(new Date(g + c, 0, 1), d.formatYear),
                    { uid: a.uniqueId + "-" + c }
                  );
                (a.title = [b[0].label, b[f - 1].label].join(" - ")),
                  (a.rows = d.split(b, 5));
              }),
              (d.compare = function (a, b) {
                return a.getFullYear() - b.getFullYear();
              }),
              (d.handleKeyDown = function (a) {
                var b = d.activeDate.getFullYear();
                "left" === a
                  ? (b -= 1)
                  : "up" === a
                  ? (b -= 5)
                  : "right" === a
                  ? (b += 1)
                  : "down" === a
                  ? (b += 5)
                  : "pageup" === a || "pagedown" === a
                  ? (b += ("pageup" === a ? -1 : 1) * d.step.years)
                  : "home" === a
                  ? (b = e(d.activeDate.getFullYear()))
                  : "end" === a && (b = e(d.activeDate.getFullYear()) + f - 1),
                  d.activeDate.setFullYear(b);
              }),
              d.refreshView();
          },
        };
      },
    ])
    .constant("datepickerPopupConfig", {
      datepickerPopup: "yyyy-MM-dd",
      currentText: "Today",
      clearText: "Clear",
      closeText: "Done",
      closeOnDateSelection: !0,
      appendToBody: !1,
      showButtonBar: !0,
    })
    .directive("datepickerPopup", [
      "$compile",
      "$parse",
      "$document",
      "$position",
      "dateFilter",
      "dateParser",
      "datepickerPopupConfig",
      function (a, b, c, d, e, f, g) {
        return {
          restrict: "EA",
          require: "ngModel",
          scope: {
            isOpen: "=?",
            currentText: "@",
            clearText: "@",
            closeText: "@",
            dateDisabled: "&",
          },
          link: function (h, i, j, k) {
            function l(a) {
              return a.replace(/([A-Z])/g, function (a) {
                return "-" + a.toLowerCase();
              });
            }
            function m(a) {
              if (a) {
                if (angular.isDate(a) && !isNaN(a))
                  return k.$setValidity("date", !0), a;
                if (angular.isString(a)) {
                  var b = f.parse(a, n) || new Date(a);
                  return isNaN(b)
                    ? void k.$setValidity("date", !1)
                    : (k.$setValidity("date", !0), b);
                }
                return void k.$setValidity("date", !1);
              }
              return k.$setValidity("date", !0), null;
            }
            var n,
              o = angular.isDefined(j.closeOnDateSelection)
                ? h.$parent.$eval(j.closeOnDateSelection)
                : g.closeOnDateSelection,
              p = angular.isDefined(j.datepickerAppendToBody)
                ? h.$parent.$eval(j.datepickerAppendToBody)
                : g.appendToBody;
            (h.showButtonBar = angular.isDefined(j.showButtonBar)
              ? h.$parent.$eval(j.showButtonBar)
              : g.showButtonBar),
              (h.getText = function (a) {
                return h[a + "Text"] || g[a + "Text"];
              }),
              j.$observe("datepickerPopup", function (a) {
                (n = a || g.datepickerPopup), k.$render();
              });
            var q = angular.element(
              "<div datepicker-popup-wrap><div datepicker></div></div>"
            );
            q.attr({ "ng-model": "date", "ng-change": "dateSelection()" });
            var r = angular.element(q.children()[0]);
            j.datepickerOptions &&
              angular.forEach(
                h.$parent.$eval(j.datepickerOptions),
                function (a, b) {
                  r.attr(l(b), a);
                }
              ),
              (h.watchData = {}),
              angular.forEach(
                ["minDate", "maxDate", "datepickerMode"],
                function (a) {
                  if (j[a]) {
                    var c = b(j[a]);
                    if (
                      (h.$parent.$watch(c, function (b) {
                        h.watchData[a] = b;
                      }),
                      r.attr(l(a), "watchData." + a),
                      "datepickerMode" === a)
                    ) {
                      var d = c.assign;
                      h.$watch("watchData." + a, function (a, b) {
                        a !== b && d(h.$parent, a);
                      });
                    }
                  }
                }
              ),
              j.dateDisabled &&
                r.attr(
                  "date-disabled",
                  "dateDisabled({ date: date, mode: mode })"
                ),
              k.$parsers.unshift(m),
              (h.dateSelection = function (a) {
                angular.isDefined(a) && (h.date = a),
                  k.$setViewValue(h.date),
                  k.$render(),
                  o && ((h.isOpen = !1), i[0].focus());
              }),
              i.bind("input change keyup", function () {
                h.$apply(function () {
                  h.date = k.$modelValue;
                });
              }),
              (k.$render = function () {
                var a = k.$viewValue ? e(k.$viewValue, n) : "";
                i.val(a), (h.date = m(k.$modelValue));
              });
            var s = function (a) {
                h.isOpen &&
                  a.target !== i[0] &&
                  h.$apply(function () {
                    h.isOpen = !1;
                  });
              },
              t = function (a) {
                h.keydown(a);
              };
            i.bind("keydown", t),
              (h.keydown = function (a) {
                27 === a.which
                  ? (a.preventDefault(), a.stopPropagation(), h.close())
                  : 40 !== a.which || h.isOpen || (h.isOpen = !0);
              }),
              h.$watch("isOpen", function (a) {
                a
                  ? (h.$broadcast("datepicker.focus"),
                    (h.position = p ? d.offset(i) : d.position(i)),
                    (h.position.top = h.position.top + i.prop("offsetHeight")),
                    c.bind("click", s))
                  : c.unbind("click", s);
              }),
              (h.select = function (a) {
                if ("today" === a) {
                  var b = new Date();
                  angular.isDate(k.$modelValue)
                    ? ((a = new Date(k.$modelValue)),
                      a.setFullYear(b.getFullYear(), b.getMonth(), b.getDate()))
                    : (a = new Date(b.setHours(0, 0, 0, 0)));
                }
                h.dateSelection(a);
              }),
              (h.close = function () {
                (h.isOpen = !1), i[0].focus();
              });
            var u = a(q)(h);
            q.remove(),
              p ? c.find("body").append(u) : i.after(u),
              h.$on("$destroy", function () {
                u.remove(), i.unbind("keydown", t), c.unbind("click", s);
              });
          },
        };
      },
    ])
    .directive("datepickerPopupWrap", function () {
      return {
        restrict: "EA",
        replace: !0,
        transclude: !0,
        templateUrl: "template/datepicker/popup.html",
        link: function (a, b) {
          b.bind("click", function (a) {
            a.preventDefault(), a.stopPropagation();
          });
        },
      };
    }),
  angular
    .module("ui.bootstrap.dropdown", [])
    .constant("dropdownConfig", { openClass: "open" })
    .service("dropdownService", [
      "$document",
      function (a) {
        var b = null;
        (this.open = function (e) {
          b || (a.bind("click", c), a.bind("keydown", d)),
            b && b !== e && (b.isOpen = !1),
            (b = e);
        }),
          (this.close = function (e) {
            b === e &&
              ((b = null), a.unbind("click", c), a.unbind("keydown", d));
          });
        var c = function (a) {
            if (b) {
              var c = b.getToggleElement();
              (a && c && c[0].contains(a.target)) ||
                b.$apply(function () {
                  b.isOpen = !1;
                });
            }
          },
          d = function (a) {
            27 === a.which && (b.focusToggleElement(), c());
          };
      },
    ])
    .controller("DropdownController", [
      "$scope",
      "$attrs",
      "$parse",
      "dropdownConfig",
      "dropdownService",
      "$animate",
      function (a, b, c, d, e, f) {
        var g,
          h = this,
          i = a.$new(),
          j = d.openClass,
          k = angular.noop,
          l = b.onToggle ? c(b.onToggle) : angular.noop;
        (this.init = function (d) {
          (h.$element = d),
            b.isOpen &&
              ((g = c(b.isOpen)),
              (k = g.assign),
              a.$watch(g, function (a) {
                i.isOpen = !!a;
              }));
        }),
          (this.toggle = function (a) {
            return (i.isOpen = arguments.length ? !!a : !i.isOpen);
          }),
          (this.isOpen = function () {
            return i.isOpen;
          }),
          (i.getToggleElement = function () {
            return h.toggleElement;
          }),
          (i.focusToggleElement = function () {
            h.toggleElement && h.toggleElement[0].focus();
          }),
          i.$watch("isOpen", function (b, c) {
            f[b ? "addClass" : "removeClass"](h.$element, j),
              b ? (i.focusToggleElement(), e.open(i)) : e.close(i),
              k(a, b),
              angular.isDefined(b) && b !== c && l(a, { open: !!b });
          }),
          a.$on("$locationChangeSuccess", function () {
            i.isOpen = !1;
          }),
          a.$on("$destroy", function () {
            i.$destroy();
          });
      },
    ])
    .directive("dropdown", function () {
      return {
        controller: "DropdownController",
        link: function (a, b, c, d) {
          d.init(b);
        },
      };
    })
    .directive("dropdownToggle", function () {
      return {
        require: "?^dropdown",
        link: function (a, b, c, d) {
          if (d) {
            d.toggleElement = b;
            var e = function (e) {
              e.preventDefault(),
                b.hasClass("disabled") ||
                  c.disabled ||
                  a.$apply(function () {
                    d.toggle();
                  });
            };
            b.bind("click", e),
              b.attr({ "aria-haspopup": !0, "aria-expanded": !1 }),
              a.$watch(d.isOpen, function (a) {
                b.attr("aria-expanded", !!a);
              }),
              a.$on("$destroy", function () {
                b.unbind("click", e);
              });
          }
        },
      };
    }),
  angular
    .module("ui.bootstrap.modal", ["ui.bootstrap.transition"])
    .factory("$$stackedMap", function () {
      return {
        createNew: function () {
          var a = [];
          return {
            add: function (b, c) {
              a.push({ key: b, value: c });
            },
            get: function (b) {
              for (var c = 0; c < a.length; c++) if (b == a[c].key) return a[c];
            },
            keys: function () {
              for (var b = [], c = 0; c < a.length; c++) b.push(a[c].key);
              return b;
            },
            top: function () {
              return a[a.length - 1];
            },
            remove: function (b) {
              for (var c = -1, d = 0; d < a.length; d++)
                if (b == a[d].key) {
                  c = d;
                  break;
                }
              return a.splice(c, 1)[0];
            },
            removeTop: function () {
              return a.splice(a.length - 1, 1)[0];
            },
            length: function () {
              return a.length;
            },
          };
        },
      };
    })
    .directive("modalBackdrop", [
      "$timeout",
      function (a) {
        return {
          restrict: "EA",
          replace: !0,
          templateUrl: "template/modal/backdrop.html",
          link: function (b, c, d) {
            (b.backdropClass = d.backdropClass || ""),
              (b.animate = !1),
              a(function () {
                b.animate = !0;
              });
          },
        };
      },
    ])
    .directive("modalWindow", [
      "$modalStack",
      "$timeout",
      function (a, b) {
        return {
          restrict: "EA",
          scope: { index: "@", animate: "=" },
          replace: !0,
          transclude: !0,
          templateUrl: function (a, b) {
            return b.templateUrl || "template/modal/window.html";
          },
          link: function (c, d, e) {
            d.addClass(e.windowClass || ""),
              (c.size = e.size),
              b(function () {
                (c.animate = !0),
                  d[0].querySelectorAll("[autofocus]").length || d[0].focus();
              }),
              (c.close = function (b) {
                var c = a.getTop();
                c &&
                  c.value.backdrop &&
                  "static" != c.value.backdrop &&
                  b.target === b.currentTarget &&
                  (b.preventDefault(),
                  b.stopPropagation(),
                  a.dismiss(c.key, "backdrop click"));
              });
          },
        };
      },
    ])
    .directive("modalTransclude", function () {
      return {
        link: function (a, b, c, d, e) {
          e(a.$parent, function (a) {
            b.empty(), b.append(a);
          });
        },
      };
    })
    .factory("$modalStack", [
      "$transition",
      "$timeout",
      "$document",
      "$compile",
      "$rootScope",
      "$$stackedMap",
      function (a, b, c, d, e, f) {
        function g() {
          for (var a = -1, b = n.keys(), c = 0; c < b.length; c++)
            n.get(b[c]).value.backdrop && (a = c);
          return a;
        }
        function h(a) {
          var b = c.find("body").eq(0),
            d = n.get(a).value;
          n.remove(a),
            j(d.modalDomEl, d.modalScope, 300, function () {
              d.modalScope.$destroy(), b.toggleClass(m, n.length() > 0), i();
            });
        }
        function i() {
          if (k && -1 == g()) {
            var a = l;
            j(k, l, 150, function () {
              a.$destroy(), (a = null);
            }),
              (k = void 0),
              (l = void 0);
          }
        }
        function j(c, d, e, f) {
          function g() {
            g.done || ((g.done = !0), c.remove(), f && f());
          }
          d.animate = !1;
          var h = a.transitionEndEventName;
          if (h) {
            var i = b(g, e);
            c.bind(h, function () {
              b.cancel(i), g(), d.$apply();
            });
          } else b(g);
        }
        var k,
          l,
          m = "modal-open",
          n = f.createNew(),
          o = {};
        return (
          e.$watch(g, function (a) {
            l && (l.index = a);
          }),
          c.bind("keydown", function (a) {
            var b;
            27 === a.which &&
              ((b = n.top()),
              b &&
                b.value.keyboard &&
                (a.preventDefault(),
                e.$apply(function () {
                  o.dismiss(b.key, "escape key press");
                })));
          }),
          (o.open = function (a, b) {
            n.add(a, {
              deferred: b.deferred,
              modalScope: b.scope,
              backdrop: b.backdrop,
              keyboard: b.keyboard,
            });
            var f = c.find("body").eq(0),
              h = g();
            if (h >= 0 && !k) {
              (l = e.$new(!0)), (l.index = h);
              var i = angular.element("<div modal-backdrop></div>");
              i.attr("backdrop-class", b.backdropClass),
                (k = d(i)(l)),
                f.append(k);
            }
            var j = angular.element("<div modal-window></div>");
            j.attr({
              "template-url": b.windowTemplateUrl,
              "window-class": b.windowClass,
              size: b.size,
              index: n.length() - 1,
              animate: "animate",
            }).html(b.content);
            var o = d(j)(b.scope);
            (n.top().value.modalDomEl = o), f.append(o), f.addClass(m);
          }),
          (o.close = function (a, b) {
            var c = n.get(a);
            c && (c.value.deferred.resolve(b), h(a));
          }),
          (o.dismiss = function (a, b) {
            var c = n.get(a);
            c && (c.value.deferred.reject(b), h(a));
          }),
          (o.dismissAll = function (a) {
            for (var b = this.getTop(); b; )
              this.dismiss(b.key, a), (b = this.getTop());
          }),
          (o.getTop = function () {
            return n.top();
          }),
          o
        );
      },
    ])
    .provider("$modal", function () {
      var a = {
        options: { backdrop: !0, keyboard: !0 },
        $get: [
          "$injector",
          "$rootScope",
          "$q",
          "$http",
          "$templateCache",
          "$controller",
          "$modalStack",
          function (b, c, d, e, f, g, h) {
            function i(a) {
              return a.template
                ? d.when(a.template)
                : e
                    .get(
                      angular.isFunction(a.templateUrl)
                        ? a.templateUrl()
                        : a.templateUrl,
                      { cache: f }
                    )
                    .then(function (a) {
                      return a.data;
                    });
            }
            function j(a) {
              var c = [];
              return (
                angular.forEach(a, function (a) {
                  (angular.isFunction(a) || angular.isArray(a)) &&
                    c.push(d.when(b.invoke(a)));
                }),
                c
              );
            }
            var k = {};
            return (
              (k.open = function (b) {
                var e = d.defer(),
                  f = d.defer(),
                  k = {
                    result: e.promise,
                    opened: f.promise,
                    close: function (a) {
                      h.close(k, a);
                    },
                    dismiss: function (a) {
                      h.dismiss(k, a);
                    },
                  };
                if (
                  ((b = angular.extend({}, a.options, b)),
                  (b.resolve = b.resolve || {}),
                  !b.template && !b.templateUrl)
                )
                  throw new Error(
                    "One of template or templateUrl options is required."
                  );
                var l = d.all([i(b)].concat(j(b.resolve)));
                return (
                  l.then(
                    function (a) {
                      var d = (b.scope || c).$new();
                      (d.$close = k.close), (d.$dismiss = k.dismiss);
                      var f,
                        i = {},
                        j = 1;
                      b.controller &&
                        ((i.$scope = d),
                        (i.$modalInstance = k),
                        angular.forEach(b.resolve, function (b, c) {
                          i[c] = a[j++];
                        }),
                        (f = g(b.controller, i)),
                        b.controllerAs && (d[b.controllerAs] = f)),
                        h.open(k, {
                          scope: d,
                          deferred: e,
                          content: a[0],
                          backdrop: b.backdrop,
                          keyboard: b.keyboard,
                          backdropClass: b.backdropClass,
                          windowClass: b.windowClass,
                          windowTemplateUrl: b.windowTemplateUrl,
                          size: b.size,
                        });
                    },
                    function (a) {
                      e.reject(a);
                    }
                  ),
                  l.then(
                    function () {
                      f.resolve(!0);
                    },
                    function () {
                      f.reject(!1);
                    }
                  ),
                  k
                );
              }),
              k
            );
          },
        ],
      };
      return a;
    }),
  angular
    .module("ui.bootstrap.pagination", [])
    .controller("PaginationController", [
      "$scope",
      "$attrs",
      "$parse",
      function (a, b, c) {
        var d = this,
          e = { $setViewValue: angular.noop },
          f = b.numPages ? c(b.numPages).assign : angular.noop;
        (this.init = function (f, g) {
          (e = f),
            (this.config = g),
            (e.$render = function () {
              d.render();
            }),
            b.itemsPerPage
              ? a.$parent.$watch(c(b.itemsPerPage), function (b) {
                  (d.itemsPerPage = parseInt(b, 10)),
                    (a.totalPages = d.calculateTotalPages());
                })
              : (this.itemsPerPage = g.itemsPerPage);
        }),
          (this.calculateTotalPages = function () {
            var b =
              this.itemsPerPage < 1
                ? 1
                : Math.ceil(a.totalItems / this.itemsPerPage);
            return Math.max(b || 0, 1);
          }),
          (this.render = function () {
            a.page = parseInt(e.$viewValue, 10) || 1;
          }),
          (a.selectPage = function (b) {
            a.page !== b &&
              b > 0 &&
              b <= a.totalPages &&
              (e.$setViewValue(b), e.$render());
          }),
          (a.getText = function (b) {
            return a[b + "Text"] || d.config[b + "Text"];
          }),
          (a.noPrevious = function () {
            return 1 === a.page;
          }),
          (a.noNext = function () {
            return a.page === a.totalPages;
          }),
          a.$watch("totalItems", function () {
            a.totalPages = d.calculateTotalPages();
          }),
          a.$watch("totalPages", function (b) {
            f(a.$parent, b), a.page > b ? a.selectPage(b) : e.$render();
          });
      },
    ])
    .constant("paginationConfig", {
      itemsPerPage: 10,
      boundaryLinks: !1,
      directionLinks: !0,
      firstText: "First",
      previousText: "Previous",
      nextText: "Next",
      lastText: "Last",
      rotate: !0,
    })
    .directive("pagination", [
      "$parse",
      "paginationConfig",
      function (a, b) {
        return {
          restrict: "EA",
          scope: {
            totalItems: "=",
            firstText: "@",
            previousText: "@",
            nextText: "@",
            lastText: "@",
          },
          require: ["pagination", "?ngModel"],
          controller: "PaginationController",
          templateUrl: "template/pagination/pagination.html",
          replace: !0,
          link: function (c, d, e, f) {
            function g(a, b, c) {
              return { number: a, text: b, active: c };
            }
            function h(a, b) {
              var c = [],
                d = 1,
                e = b,
                f = angular.isDefined(k) && b > k;
              f &&
                (l
                  ? ((d = Math.max(a - Math.floor(k / 2), 1)),
                    (e = d + k - 1),
                    e > b && ((e = b), (d = e - k + 1)))
                  : ((d = (Math.ceil(a / k) - 1) * k + 1),
                    (e = Math.min(d + k - 1, b))));
              for (var h = d; e >= h; h++) {
                var i = g(h, h, h === a);
                c.push(i);
              }
              if (f && !l) {
                if (d > 1) {
                  var j = g(d - 1, "...", !1);
                  c.unshift(j);
                }
                if (b > e) {
                  var m = g(e + 1, "...", !1);
                  c.push(m);
                }
              }
              return c;
            }
            var i = f[0],
              j = f[1];
            if (j) {
              var k = angular.isDefined(e.maxSize)
                  ? c.$parent.$eval(e.maxSize)
                  : b.maxSize,
                l = angular.isDefined(e.rotate)
                  ? c.$parent.$eval(e.rotate)
                  : b.rotate;
              (c.boundaryLinks = angular.isDefined(e.boundaryLinks)
                ? c.$parent.$eval(e.boundaryLinks)
                : b.boundaryLinks),
                (c.directionLinks = angular.isDefined(e.directionLinks)
                  ? c.$parent.$eval(e.directionLinks)
                  : b.directionLinks),
                i.init(j, b),
                e.maxSize &&
                  c.$parent.$watch(a(e.maxSize), function (a) {
                    (k = parseInt(a, 10)), i.render();
                  });
              var m = i.render;
              i.render = function () {
                m(),
                  c.page > 0 &&
                    c.page <= c.totalPages &&
                    (c.pages = h(c.page, c.totalPages));
              };
            }
          },
        };
      },
    ])
    .constant("pagerConfig", {
      itemsPerPage: 10,
      previousText: "« Previous",
      nextText: "Next »",
      align: !0,
    })
    .directive("pager", [
      "pagerConfig",
      function (a) {
        return {
          restrict: "EA",
          scope: { totalItems: "=", previousText: "@", nextText: "@" },
          require: ["pager", "?ngModel"],
          controller: "PaginationController",
          templateUrl: "template/pagination/pager.html",
          replace: !0,
          link: function (b, c, d, e) {
            var f = e[0],
              g = e[1];
            g &&
              ((b.align = angular.isDefined(d.align)
                ? b.$parent.$eval(d.align)
                : a.align),
              f.init(g, a));
          },
        };
      },
    ]),
  angular
    .module("ui.bootstrap.tooltip", [
      "ui.bootstrap.position",
      "ui.bootstrap.bindHtml",
    ])
    .provider("$tooltip", function () {
      function a(a) {
        var b = /[A-Z]/g,
          c = "-";
        return a.replace(b, function (a, b) {
          return (b ? c : "") + a.toLowerCase();
        });
      }
      var b = { placement: "top", animation: !0, popupDelay: 0 },
        c = { mouseenter: "mouseleave", click: "click", focus: "blur" },
        d = {};
      (this.options = function (a) {
        angular.extend(d, a);
      }),
        (this.setTriggers = function (a) {
          angular.extend(c, a);
        }),
        (this.$get = [
          "$window",
          "$compile",
          "$timeout",
          "$document",
          "$position",
          "$interpolate",
          function (e, f, g, h, i, j) {
            return function (e, k, l) {
              function m(a) {
                var b = a || n.trigger || l,
                  d = c[b] || b;
                return { show: b, hide: d };
              }
              var n = angular.extend({}, b, d),
                o = a(e),
                p = j.startSymbol(),
                q = j.endSymbol(),
                r =
                  "<div " +
                  o +
                  '-popup title="' +
                  p +
                  "title" +
                  q +
                  '" content="' +
                  p +
                  "content" +
                  q +
                  '" placement="' +
                  p +
                  "placement" +
                  q +
                  '" animation="animation" is-open="isOpen"></div>';
              return {
                restrict: "EA",
                compile: function () {
                  var a = f(r);
                  return function (b, c, d) {
                    function f() {
                      D.isOpen ? l() : j();
                    }
                    function j() {
                      (!C || b.$eval(d[k + "Enable"])) &&
                        (s(),
                        D.popupDelay
                          ? z ||
                            ((z = g(o, D.popupDelay, !1)),
                            z.then(function (a) {
                              a();
                            }))
                          : o()());
                    }
                    function l() {
                      b.$apply(function () {
                        p();
                      });
                    }
                    function o() {
                      return (
                        (z = null),
                        y && (g.cancel(y), (y = null)),
                        D.content
                          ? (q(),
                            w.css({ top: 0, left: 0, display: "block" }),
                            D.$digest(),
                            E(),
                            (D.isOpen = !0),
                            D.$digest(),
                            E)
                          : angular.noop
                      );
                    }
                    function p() {
                      (D.isOpen = !1),
                        g.cancel(z),
                        (z = null),
                        D.animation ? y || (y = g(r, 500)) : r();
                    }
                    function q() {
                      w && r(),
                        (x = D.$new()),
                        (w = a(x, function (a) {
                          A ? h.find("body").append(a) : c.after(a);
                        }));
                    }
                    function r() {
                      (y = null),
                        w && (w.remove(), (w = null)),
                        x && (x.$destroy(), (x = null));
                    }
                    function s() {
                      t(), u();
                    }
                    function t() {
                      var a = d[k + "Placement"];
                      D.placement = angular.isDefined(a) ? a : n.placement;
                    }
                    function u() {
                      var a = d[k + "PopupDelay"],
                        b = parseInt(a, 10);
                      D.popupDelay = isNaN(b) ? n.popupDelay : b;
                    }
                    function v() {
                      var a = d[k + "Trigger"];
                      F(),
                        (B = m(a)),
                        B.show === B.hide
                          ? c.bind(B.show, f)
                          : (c.bind(B.show, j), c.bind(B.hide, l));
                    }
                    var w,
                      x,
                      y,
                      z,
                      A = angular.isDefined(n.appendToBody)
                        ? n.appendToBody
                        : !1,
                      B = m(void 0),
                      C = angular.isDefined(d[k + "Enable"]),
                      D = b.$new(!0),
                      E = function () {
                        var a = i.positionElements(c, w, D.placement, A);
                        (a.top += "px"), (a.left += "px"), w.css(a);
                      };
                    (D.isOpen = !1),
                      d.$observe(e, function (a) {
                        (D.content = a), !a && D.isOpen && p();
                      }),
                      d.$observe(k + "Title", function (a) {
                        D.title = a;
                      });
                    var F = function () {
                      c.unbind(B.show, j), c.unbind(B.hide, l);
                    };
                    v();
                    var G = b.$eval(d[k + "Animation"]);
                    D.animation = angular.isDefined(G) ? !!G : n.animation;
                    var H = b.$eval(d[k + "AppendToBody"]);
                    (A = angular.isDefined(H) ? H : A),
                      A &&
                        b.$on("$locationChangeSuccess", function () {
                          D.isOpen && p();
                        }),
                      b.$on("$destroy", function () {
                        g.cancel(y), g.cancel(z), F(), r(), (D = null);
                      });
                  };
                },
              };
            };
          },
        ]);
    })
    .directive("tooltipPopup", function () {
      return {
        restrict: "EA",
        replace: !0,
        scope: { content: "@", placement: "@", animation: "&", isOpen: "&" },
        templateUrl: "template/tooltip/tooltip-popup.html",
      };
    })
    .directive("tooltip", [
      "$tooltip",
      function (a) {
        return a("tooltip", "tooltip", "mouseenter");
      },
    ])
    .directive("tooltipHtmlUnsafePopup", function () {
      return {
        restrict: "EA",
        replace: !0,
        scope: { content: "@", placement: "@", animation: "&", isOpen: "&" },
        templateUrl: "template/tooltip/tooltip-html-unsafe-popup.html",
      };
    })
    .directive("tooltipHtmlUnsafe", [
      "$tooltip",
      function (a) {
        return a("tooltipHtmlUnsafe", "tooltip", "mouseenter");
      },
    ]),
  angular
    .module("ui.bootstrap.popover", ["ui.bootstrap.tooltip"])
    .directive("popoverPopup", function () {
      return {
        restrict: "EA",
        replace: !0,
        scope: {
          title: "@",
          content: "@",
          placement: "@",
          animation: "&",
          isOpen: "&",
        },
        templateUrl: "template/popover/popover.html",
      };
    })
    .directive("popover", [
      "$tooltip",
      function (a) {
        return a("popover", "popover", "click");
      },
    ]),
  angular
    .module("ui.bootstrap.progressbar", [])
    .constant("progressConfig", { animate: !0, max: 100 })
    .controller("ProgressController", [
      "$scope",
      "$attrs",
      "progressConfig",
      function (a, b, c) {
        var d = this,
          e = angular.isDefined(b.animate)
            ? a.$parent.$eval(b.animate)
            : c.animate;
        (this.bars = []),
          (a.max = angular.isDefined(b.max) ? a.$parent.$eval(b.max) : c.max),
          (this.addBar = function (b, c) {
            e || c.css({ transition: "none" }),
              this.bars.push(b),
              b.$watch("value", function (c) {
                b.percent = +((100 * c) / a.max).toFixed(2);
              }),
              b.$on("$destroy", function () {
                (c = null), d.removeBar(b);
              });
          }),
          (this.removeBar = function (a) {
            this.bars.splice(this.bars.indexOf(a), 1);
          });
      },
    ])
    .directive("progress", function () {
      return {
        restrict: "EA",
        replace: !0,
        transclude: !0,
        controller: "ProgressController",
        require: "progress",
        scope: {},
        templateUrl: "template/progressbar/progress.html",
      };
    })
    .directive("bar", function () {
      return {
        restrict: "EA",
        replace: !0,
        transclude: !0,
        require: "^progress",
        scope: { value: "=", type: "@" },
        templateUrl: "template/progressbar/bar.html",
        link: function (a, b, c, d) {
          d.addBar(a, b);
        },
      };
    })
    .directive("progressbar", function () {
      return {
        restrict: "EA",
        replace: !0,
        transclude: !0,
        controller: "ProgressController",
        scope: { value: "=", type: "@" },
        templateUrl: "template/progressbar/progressbar.html",
        link: function (a, b, c, d) {
          d.addBar(a, angular.element(b.children()[0]));
        },
      };
    }),
  angular
    .module("ui.bootstrap.rating", [])
    .constant("ratingConfig", { max: 5, stateOn: null, stateOff: null })
    .controller("RatingController", [
      "$scope",
      "$attrs",
      "ratingConfig",
      function (a, b, c) {
        var d = { $setViewValue: angular.noop };
        (this.init = function (e) {
          (d = e),
            (d.$render = this.render),
            (this.stateOn = angular.isDefined(b.stateOn)
              ? a.$parent.$eval(b.stateOn)
              : c.stateOn),
            (this.stateOff = angular.isDefined(b.stateOff)
              ? a.$parent.$eval(b.stateOff)
              : c.stateOff);
          var f = angular.isDefined(b.ratingStates)
            ? a.$parent.$eval(b.ratingStates)
            : new Array(
                angular.isDefined(b.max) ? a.$parent.$eval(b.max) : c.max
              );
          a.range = this.buildTemplateObjects(f);
        }),
          (this.buildTemplateObjects = function (a) {
            for (var b = 0, c = a.length; c > b; b++)
              a[b] = angular.extend(
                { index: b },
                { stateOn: this.stateOn, stateOff: this.stateOff },
                a[b]
              );
            return a;
          }),
          (a.rate = function (b) {
            !a.readonly &&
              b >= 0 &&
              b <= a.range.length &&
              (d.$setViewValue(b), d.$render());
          }),
          (a.enter = function (b) {
            a.readonly || (a.value = b), a.onHover({ value: b });
          }),
          (a.reset = function () {
            (a.value = d.$viewValue), a.onLeave();
          }),
          (a.onKeydown = function (b) {
            /(37|38|39|40)/.test(b.which) &&
              (b.preventDefault(),
              b.stopPropagation(),
              a.rate(a.value + (38 === b.which || 39 === b.which ? 1 : -1)));
          }),
          (this.render = function () {
            a.value = d.$viewValue;
          });
      },
    ])
    .directive("rating", function () {
      return {
        restrict: "EA",
        require: ["rating", "ngModel"],
        scope: { readonly: "=?", onHover: "&", onLeave: "&" },
        controller: "RatingController",
        templateUrl: "template/rating/rating.html",
        replace: !0,
        link: function (a, b, c, d) {
          var e = d[0],
            f = d[1];
          f && e.init(f);
        },
      };
    }),
  angular
    .module("ui.bootstrap.tabs", [])
    .controller("TabsetController", [
      "$scope",
      function (a) {
        var b = this,
          c = (b.tabs = a.tabs = []);
        (b.select = function (a) {
          angular.forEach(c, function (b) {
            b.active && b !== a && ((b.active = !1), b.onDeselect());
          }),
            (a.active = !0),
            a.onSelect();
        }),
          (b.addTab = function (a) {
            c.push(a),
              1 === c.length ? (a.active = !0) : a.active && b.select(a);
          }),
          (b.removeTab = function (a) {
            var e = c.indexOf(a);
            if (a.active && c.length > 1 && !d) {
              var f = e == c.length - 1 ? e - 1 : e + 1;
              b.select(c[f]);
            }
            c.splice(e, 1);
          });
        var d;
        a.$on("$destroy", function () {
          d = !0;
        });
      },
    ])
    .directive("tabset", function () {
      return {
        restrict: "EA",
        transclude: !0,
        replace: !0,
        scope: { type: "@" },
        controller: "TabsetController",
        templateUrl: "template/tabs/tabset.html",
        link: function (a, b, c) {
          (a.vertical = angular.isDefined(c.vertical)
            ? a.$parent.$eval(c.vertical)
            : !1),
            (a.justified = angular.isDefined(c.justified)
              ? a.$parent.$eval(c.justified)
              : !1);
        },
      };
    })
    .directive("tab", [
      "$parse",
      function (a) {
        return {
          require: "^tabset",
          restrict: "EA",
          replace: !0,
          templateUrl: "template/tabs/tab.html",
          transclude: !0,
          scope: {
            active: "=?",
            heading: "@",
            onSelect: "&select",
            onDeselect: "&deselect",
          },
          controller: function () {},
          compile: function (b, c, d) {
            return function (b, c, e, f) {
              b.$watch("active", function (a) {
                a && f.select(b);
              }),
                (b.disabled = !1),
                e.disabled &&
                  b.$parent.$watch(a(e.disabled), function (a) {
                    b.disabled = !!a;
                  }),
                (b.select = function () {
                  b.disabled || (b.active = !0);
                }),
                f.addTab(b),
                b.$on("$destroy", function () {
                  f.removeTab(b);
                }),
                (b.$transcludeFn = d);
            };
          },
        };
      },
    ])
    .directive("tabHeadingTransclude", [
      function () {
        return {
          restrict: "A",
          require: "^tab",
          link: function (a, b) {
            a.$watch("headingElement", function (a) {
              a && (b.html(""), b.append(a));
            });
          },
        };
      },
    ])
    .directive("tabContentTransclude", function () {
      function a(a) {
        return (
          a.tagName &&
          (a.hasAttribute("tab-heading") ||
            a.hasAttribute("data-tab-heading") ||
            "tab-heading" === a.tagName.toLowerCase() ||
            "data-tab-heading" === a.tagName.toLowerCase())
        );
      }
      return {
        restrict: "A",
        require: "^tabset",
        link: function (b, c, d) {
          var e = b.$eval(d.tabContentTransclude);
          e.$transcludeFn(e.$parent, function (b) {
            angular.forEach(b, function (b) {
              a(b) ? (e.headingElement = b) : c.append(b);
            });
          });
        },
      };
    }),
  angular
    .module("ui.bootstrap.timepicker", [])
    .constant("timepickerConfig", {
      hourStep: 1,
      minuteStep: 1,
      showMeridian: !0,
      meridians: null,
      readonlyInput: !1,
      mousewheel: !0,
    })
    .controller("TimepickerController", [
      "$scope",
      "$attrs",
      "$parse",
      "$log",
      "$locale",
      "timepickerConfig",
      function (a, b, c, d, e, f) {
        function g() {
          var b = parseInt(a.hours, 10),
            c = a.showMeridian ? b > 0 && 13 > b : b >= 0 && 24 > b;
          return c
            ? (a.showMeridian &&
                (12 === b && (b = 0), a.meridian === p[1] && (b += 12)),
              b)
            : void 0;
        }
        function h() {
          var b = parseInt(a.minutes, 10);
          return b >= 0 && 60 > b ? b : void 0;
        }
        function i(a) {
          return angular.isDefined(a) && a.toString().length < 2 ? "0" + a : a;
        }
        function j(a) {
          k(), o.$setViewValue(new Date(n)), l(a);
        }
        function k() {
          o.$setValidity("time", !0),
            (a.invalidHours = !1),
            (a.invalidMinutes = !1);
        }
        function l(b) {
          var c = n.getHours(),
            d = n.getMinutes();
          a.showMeridian && (c = 0 === c || 12 === c ? 12 : c % 12),
            (a.hours = "h" === b ? c : i(c)),
            (a.minutes = "m" === b ? d : i(d)),
            (a.meridian = n.getHours() < 12 ? p[0] : p[1]);
        }
        function m(a) {
          var b = new Date(n.getTime() + 6e4 * a);
          n.setHours(b.getHours(), b.getMinutes()), j();
        }
        var n = new Date(),
          o = { $setViewValue: angular.noop },
          p = angular.isDefined(b.meridians)
            ? a.$parent.$eval(b.meridians)
            : f.meridians || e.DATETIME_FORMATS.AMPMS;
        this.init = function (c, d) {
          (o = c), (o.$render = this.render);
          var e = d.eq(0),
            g = d.eq(1),
            h = angular.isDefined(b.mousewheel)
              ? a.$parent.$eval(b.mousewheel)
              : f.mousewheel;
          h && this.setupMousewheelEvents(e, g),
            (a.readonlyInput = angular.isDefined(b.readonlyInput)
              ? a.$parent.$eval(b.readonlyInput)
              : f.readonlyInput),
            this.setupInputEvents(e, g);
        };
        var q = f.hourStep;
        b.hourStep &&
          a.$parent.$watch(c(b.hourStep), function (a) {
            q = parseInt(a, 10);
          });
        var r = f.minuteStep;
        b.minuteStep &&
          a.$parent.$watch(c(b.minuteStep), function (a) {
            r = parseInt(a, 10);
          }),
          (a.showMeridian = f.showMeridian),
          b.showMeridian &&
            a.$parent.$watch(c(b.showMeridian), function (b) {
              if (((a.showMeridian = !!b), o.$error.time)) {
                var c = g(),
                  d = h();
                angular.isDefined(c) &&
                  angular.isDefined(d) &&
                  (n.setHours(c), j());
              } else l();
            }),
          (this.setupMousewheelEvents = function (b, c) {
            var d = function (a) {
              a.originalEvent && (a = a.originalEvent);
              var b = a.wheelDelta ? a.wheelDelta : -a.deltaY;
              return a.detail || b > 0;
            };
            b.bind("mousewheel wheel", function (b) {
              a.$apply(d(b) ? a.incrementHours() : a.decrementHours()),
                b.preventDefault();
            }),
              c.bind("mousewheel wheel", function (b) {
                a.$apply(d(b) ? a.incrementMinutes() : a.decrementMinutes()),
                  b.preventDefault();
              });
          }),
          (this.setupInputEvents = function (b, c) {
            if (a.readonlyInput)
              return (
                (a.updateHours = angular.noop),
                void (a.updateMinutes = angular.noop)
              );
            var d = function (b, c) {
              o.$setViewValue(null),
                o.$setValidity("time", !1),
                angular.isDefined(b) && (a.invalidHours = b),
                angular.isDefined(c) && (a.invalidMinutes = c);
            };
            (a.updateHours = function () {
              var a = g();
              angular.isDefined(a) ? (n.setHours(a), j("h")) : d(!0);
            }),
              b.bind("blur", function () {
                !a.invalidHours &&
                  a.hours < 10 &&
                  a.$apply(function () {
                    a.hours = i(a.hours);
                  });
              }),
              (a.updateMinutes = function () {
                var a = h();
                angular.isDefined(a)
                  ? (n.setMinutes(a), j("m"))
                  : d(void 0, !0);
              }),
              c.bind("blur", function () {
                !a.invalidMinutes &&
                  a.minutes < 10 &&
                  a.$apply(function () {
                    a.minutes = i(a.minutes);
                  });
              });
          }),
          (this.render = function () {
            var a = o.$modelValue ? new Date(o.$modelValue) : null;
            isNaN(a)
              ? (o.$setValidity("time", !1),
                d.error(
                  'Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.'
                ))
              : (a && (n = a), k(), l());
          }),
          (a.incrementHours = function () {
            m(60 * q);
          }),
          (a.decrementHours = function () {
            m(60 * -q);
          }),
          (a.incrementMinutes = function () {
            m(r);
          }),
          (a.decrementMinutes = function () {
            m(-r);
          }),
          (a.toggleMeridian = function () {
            m(720 * (n.getHours() < 12 ? 1 : -1));
          });
      },
    ])
    .directive("timepicker", function () {
      return {
        restrict: "EA",
        require: ["timepicker", "?^ngModel"],
        controller: "TimepickerController",
        replace: !0,
        scope: {},
        templateUrl: "template/timepicker/timepicker.html",
        link: function (a, b, c, d) {
          var e = d[0],
            f = d[1];
          f && e.init(f, b.find("input"));
        },
      };
    }),
  angular
    .module("ui.bootstrap.typeahead", [
      "ui.bootstrap.position",
      "ui.bootstrap.bindHtml",
    ])
    .factory("typeaheadParser", [
      "$parse",
      function (a) {
        var b =
          /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
        return {
          parse: function (c) {
            var d = c.match(b);
            if (!d)
              throw new Error(
                'Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "' +
                  c +
                  '".'
              );
            return {
              itemName: d[3],
              source: a(d[4]),
              viewMapper: a(d[2] || d[1]),
              modelMapper: a(d[1]),
            };
          },
        };
      },
    ])
    .directive("typeahead", [
      "$compile",
      "$parse",
      "$q",
      "$timeout",
      "$document",
      "$position",
      "typeaheadParser",
      function (a, b, c, d, e, f, g) {
        var h = [9, 13, 27, 38, 40];
        return {
          require: "ngModel",
          link: function (i, j, k, l) {
            var m,
              n = i.$eval(k.typeaheadMinLength) || 1,
              o = i.$eval(k.typeaheadWaitMs) || 0,
              p = i.$eval(k.typeaheadEditable) !== !1,
              q = b(k.typeaheadLoading).assign || angular.noop,
              r = b(k.typeaheadOnSelect),
              s = k.typeaheadInputFormatter
                ? b(k.typeaheadInputFormatter)
                : void 0,
              t = k.typeaheadAppendToBody
                ? i.$eval(k.typeaheadAppendToBody)
                : !1,
              u = i.$eval(k.typeaheadFocusFirst) !== !1,
              v = b(k.ngModel).assign,
              w = g.parse(k.typeahead),
              x = i.$new();
            i.$on("$destroy", function () {
              x.$destroy();
            });
            var y =
              "typeahead-" + x.$id + "-" + Math.floor(1e4 * Math.random());
            j.attr({
              "aria-autocomplete": "list",
              "aria-expanded": !1,
              "aria-owns": y,
            });
            var z = angular.element("<div typeahead-popup></div>");
            z.attr({
              id: y,
              matches: "matches",
              active: "activeIdx",
              select: "select(activeIdx)",
              query: "query",
              position: "position",
            }),
              angular.isDefined(k.typeaheadTemplateUrl) &&
                z.attr("template-url", k.typeaheadTemplateUrl);
            var A = function () {
                (x.matches = []),
                  (x.activeIdx = -1),
                  j.attr("aria-expanded", !1);
              },
              B = function (a) {
                return y + "-option-" + a;
              };
            x.$watch("activeIdx", function (a) {
              0 > a
                ? j.removeAttr("aria-activedescendant")
                : j.attr("aria-activedescendant", B(a));
            });
            var C = function (a) {
              var b = { $viewValue: a };
              q(i, !0),
                c.when(w.source(i, b)).then(
                  function (c) {
                    var d = a === l.$viewValue;
                    if (d && m)
                      if (c.length > 0) {
                        (x.activeIdx = u ? 0 : -1), (x.matches.length = 0);
                        for (var e = 0; e < c.length; e++)
                          (b[w.itemName] = c[e]),
                            x.matches.push({
                              id: B(e),
                              label: w.viewMapper(x, b),
                              model: c[e],
                            });
                        (x.query = a),
                          (x.position = t ? f.offset(j) : f.position(j)),
                          (x.position.top =
                            x.position.top + j.prop("offsetHeight")),
                          j.attr("aria-expanded", !0);
                      } else A();
                    d && q(i, !1);
                  },
                  function () {
                    A(), q(i, !1);
                  }
                );
            };
            A(), (x.query = void 0);
            var D,
              E = function (a) {
                D = d(function () {
                  C(a);
                }, o);
              },
              F = function () {
                D && d.cancel(D);
              };
            l.$parsers.unshift(function (a) {
              return (
                (m = !0),
                a && a.length >= n
                  ? o > 0
                    ? (F(), E(a))
                    : C(a)
                  : (q(i, !1), F(), A()),
                p
                  ? a
                  : a
                  ? void l.$setValidity("editable", !1)
                  : (l.$setValidity("editable", !0), a)
              );
            }),
              l.$formatters.push(function (a) {
                var b,
                  c,
                  d = {};
                return s
                  ? ((d.$model = a), s(i, d))
                  : ((d[w.itemName] = a),
                    (b = w.viewMapper(i, d)),
                    (d[w.itemName] = void 0),
                    (c = w.viewMapper(i, d)),
                    b !== c ? b : a);
              }),
              (x.select = function (a) {
                var b,
                  c,
                  e = {};
                (e[w.itemName] = c = x.matches[a].model),
                  (b = w.modelMapper(i, e)),
                  v(i, b),
                  l.$setValidity("editable", !0),
                  r(i, { $item: c, $model: b, $label: w.viewMapper(i, e) }),
                  A(),
                  d(
                    function () {
                      j[0].focus();
                    },
                    0,
                    !1
                  );
              }),
              j.bind("keydown", function (a) {
                0 !== x.matches.length &&
                  -1 !== h.indexOf(a.which) &&
                  (-1 != x.activeIdx || (13 !== a.which && 9 !== a.which)) &&
                  (a.preventDefault(),
                  40 === a.which
                    ? ((x.activeIdx = (x.activeIdx + 1) % x.matches.length),
                      x.$digest())
                    : 38 === a.which
                    ? ((x.activeIdx =
                        (x.activeIdx > 0 ? x.activeIdx : x.matches.length) - 1),
                      x.$digest())
                    : 13 === a.which || 9 === a.which
                    ? x.$apply(function () {
                        x.select(x.activeIdx);
                      })
                    : 27 === a.which &&
                      (a.stopPropagation(), A(), x.$digest()));
              }),
              j.bind("blur", function () {
                m = !1;
              });
            var G = function (a) {
              j[0] !== a.target && (A(), x.$digest());
            };
            e.bind("click", G),
              i.$on("$destroy", function () {
                e.unbind("click", G), t && H.remove();
              });
            var H = a(z)(x);
            t ? e.find("body").append(H) : j.after(H);
          },
        };
      },
    ])
    .directive("typeaheadPopup", function () {
      return {
        restrict: "EA",
        scope: {
          matches: "=",
          query: "=",
          active: "=",
          position: "=",
          select: "&",
        },
        replace: !0,
        templateUrl: "template/typeahead/typeahead-popup.html",
        link: function (a, b, c) {
          (a.templateUrl = c.templateUrl),
            (a.isOpen = function () {
              return a.matches.length > 0;
            }),
            (a.isActive = function (b) {
              return a.active == b;
            }),
            (a.selectActive = function (b) {
              a.active = b;
            }),
            (a.selectMatch = function (b) {
              a.select({ activeIdx: b });
            });
        },
      };
    })
    .directive("typeaheadMatch", [
      "$http",
      "$templateCache",
      "$compile",
      "$parse",
      function (a, b, c, d) {
        return {
          restrict: "EA",
          scope: { index: "=", match: "=", query: "=" },
          link: function (e, f, g) {
            var h =
              d(g.templateUrl)(e.$parent) ||
              "template/typeahead/typeahead-match.html";
            a.get(h, { cache: b }).success(function (a) {
              f.replaceWith(c(a.trim())(e));
            });
          },
        };
      },
    ])
    .filter("typeaheadHighlight", function () {
      function a(a) {
        return a.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
      }
      return function (b, c) {
        return c
          ? ("" + b).replace(new RegExp(a(c), "gi"), "<strong>$&</strong>")
          : b;
      };
    }),
  angular.module("template/accordion/accordion-group.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/accordion/accordion-group.html",
        '<div class="panel panel-default">\n  <div class="panel-heading">\n    <h4 class="panel-title">\n      <a href class="accordion-toggle" ng-click="toggleOpen()" accordion-transclude="heading"><span ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></a>\n    </h4>\n  </div>\n  <div class="panel-collapse" collapse="!isOpen">\n	  <div class="panel-body" ng-transclude></div>\n  </div>\n</div>\n'
      );
    },
  ]),
  angular.module("template/accordion/accordion.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/accordion/accordion.html",
        '<div class="panel-group" ng-transclude></div>'
      );
    },
  ]),
  angular.module("template/alert/alert.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/alert/alert.html",
        '<div class="alert" ng-class="[\'alert-\' + (type || \'warning\'), closeable ? \'alert-dismissable\' : null]" role="alert">\n    <button ng-show="closeable" type="button" class="close" ng-click="close()">\n        <span aria-hidden="true">&times;</span>\n        <span class="sr-only">Close</span>\n    </button>\n    <div ng-transclude></div>\n</div>\n'
      );
    },
  ]),
  angular.module("template/carousel/carousel.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/carousel/carousel.html",
        '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel" ng-swipe-right="prev()" ng-swipe-left="next()">\n    <ol class="carousel-indicators" ng-show="slides.length > 1">\n        <li ng-repeat="slide in slides track by $index" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>\n    </ol>\n    <div class="carousel-inner" ng-transclude></div>\n    <a class="left carousel-control" ng-click="prev()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-left"></span></a>\n    <a class="right carousel-control" ng-click="next()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-right"></span></a>\n</div>\n'
      );
    },
  ]),
  angular.module("template/carousel/slide.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/carousel/slide.html",
        "<div ng-class=\"{\n    'active': leaving || (active && !entering),\n    'prev': (next || active) && direction=='prev',\n    'next': (next || active) && direction=='next',\n    'right': direction=='prev',\n    'left': direction=='next'\n  }\" class=\"item text-center\" ng-transclude></div>\n"
      );
    },
  ]),
  angular.module("template/datepicker/datepicker.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/datepicker/datepicker.html",
        '<div ng-switch="datepickerMode" role="application" ng-keydown="keydown($event)">\n  <daypicker ng-switch-when="day" tabindex="0"></daypicker>\n  <monthpicker ng-switch-when="month" tabindex="0"></monthpicker>\n  <yearpicker ng-switch-when="year" tabindex="0"></yearpicker>\n</div>'
      );
    },
  ]),
  angular.module("template/datepicker/day.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/datepicker/day.html",
        '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="{{5 + showWeeks}}"><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n    <tr>\n      <th ng-show="showWeeks" class="text-center"></th>\n      <th ng-repeat="label in labels track by $index" class="text-center"><small aria-label="{{label.full}}">{{label.abbr}}</small></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-show="showWeeks" class="text-center h6"><em>{{ weekNumbers[$index] }}</em></td>\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default btn-sm" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-muted\': dt.secondary, \'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n'
      );
    },
  ]),
  angular.module("template/datepicker/month.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/datepicker/month.html",
        '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n'
      );
    },
  ]),
  angular.module("template/datepicker/popup.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/datepicker/popup.html",
        '<ul class="dropdown-menu" ng-style="{display: (isOpen && \'block\') || \'none\', top: position.top+\'px\', left: position.left+\'px\'}" ng-keydown="keydown($event)">\n	<li ng-transclude></li>\n	<li ng-if="showButtonBar" style="padding:10px 9px 2px">\n		<span class="btn-group pull-left">\n			<button type="button" class="btn btn-sm btn-info" ng-click="select(\'today\')">{{ getText(\'current\') }}</button>\n			<button type="button" class="btn btn-sm btn-danger" ng-click="select(null)">{{ getText(\'clear\') }}</button>\n		</span>\n		<button type="button" class="btn btn-sm btn-success pull-right" ng-click="close()">{{ getText(\'close\') }}</button>\n	</li>\n</ul>\n'
      );
    },
  ]),
  angular.module("template/datepicker/year.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/datepicker/year.html",
        '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="3"><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n'
      );
    },
  ]),
  angular.module("template/modal/backdrop.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/modal/backdrop.html",
        '<div class="modal-backdrop fade {{ backdropClass }}"\n     ng-class="{in: animate}"\n     ng-style="{\'z-index\': 1040 + (index && 1 || 0) + index*10}"\n></div>\n'
      );
    },
  ]),
  angular.module("template/modal/window.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/modal/window.html",
        '<div tabindex="-1" role="dialog" class="modal fade" ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click="close($event)">\n    <div class="modal-dialog" ng-class="{\'modal-sm\': size == \'sm\', \'modal-lg\': size == \'lg\'}"><div class="modal-content" modal-transclude></div></div>\n</div>'
      );
    },
  ]),
  angular.module("template/pagination/pager.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/pagination/pager.html",
        '<ul class="pager">\n  <li ng-class="{disabled: noPrevious(), previous: align}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n  <li ng-class="{disabled: noNext(), next: align}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n</ul>'
      );
    },
  ]),
  angular.module("template/pagination/pagination.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/pagination/pagination.html",
        '<ul class="pagination">\n  <li ng-if="boundaryLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(1)">{{getText(\'first\')}}</a></li>\n  <li ng-if="directionLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n  <li ng-repeat="page in pages track by $index" ng-class="{active: page.active}"><a href ng-click="selectPage(page.number)">{{page.text}}</a></li>\n  <li ng-if="directionLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n  <li ng-if="boundaryLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(totalPages)">{{getText(\'last\')}}</a></li>\n</ul>'
      );
    },
  ]),
  angular.module("template/tooltip/tooltip-html-unsafe-popup.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/tooltip/tooltip-html-unsafe-popup.html",
        '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" bind-html-unsafe="content"></div>\n</div>\n'
      );
    },
  ]),
  angular.module("template/tooltip/tooltip-popup.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/tooltip/tooltip-popup.html",
        '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind="content"></div>\n</div>\n'
      );
    },
  ]),
  angular.module("template/popover/popover.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/popover/popover.html",
        '<div class="popover {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-show="title"></h3>\n      <div class="popover-content" ng-bind="content"></div>\n  </div>\n</div>\n'
      );
    },
  ]),
  angular.module("template/progressbar/bar.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/progressbar/bar.html",
        '<div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: percent + \'%\'}" aria-valuetext="{{percent | number:0}}%" ng-transclude></div>'
      );
    },
  ]),
  angular.module("template/progressbar/progress.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/progressbar/progress.html",
        '<div class="progress" ng-transclude></div>'
      );
    },
  ]),
  angular.module("template/progressbar/progressbar.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/progressbar/progressbar.html",
        '<div class="progress">\n  <div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: percent + \'%\'}" aria-valuetext="{{percent | number:0}}%" ng-transclude></div>\n</div>'
      );
    },
  ]),
  angular.module("template/rating/rating.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/rating/rating.html",
        '<span ng-mouseleave="reset()" ng-keydown="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="{{range.length}}" aria-valuenow="{{value}}">\n    <i ng-repeat="r in range track by $index" ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="glyphicon" ng-class="$index < value && (r.stateOn || \'glyphicon-star\') || (r.stateOff || \'glyphicon-star-empty\')">\n        <span class="sr-only">({{ $index < value ? \'*\' : \' \' }})</span>\n    </i>\n</span>'
      );
    },
  ]),
  angular.module("template/tabs/tab.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/tabs/tab.html",
        '<li ng-class="{active: active, disabled: disabled}">\n  <a href ng-click="select()" tab-heading-transclude>{{heading}}</a>\n</li>\n'
      );
    },
  ]),
  angular.module("template/tabs/tabset.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/tabs/tabset.html",
        '<div>\n  <ul class="nav nav-{{type || \'tabs\'}}" ng-class="{\'nav-stacked\': vertical, \'nav-justified\': justified}" ng-transclude></ul>\n  <div class="tab-content">\n    <div class="tab-pane" \n         ng-repeat="tab in tabs" \n         ng-class="{active: tab.active}"\n         tab-content-transclude="tab">\n    </div>\n  </div>\n</div>\n'
      );
    },
  ]),
  angular.module("template/timepicker/timepicker.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/timepicker/timepicker.html",
        '<table>\n	<tbody>\n		<tr class="text-center">\n			<td><a ng-click="incrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n			<td>&nbsp;</td>\n			<td><a ng-click="incrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n			<td ng-show="showMeridian"></td>\n		</tr>\n		<tr>\n			<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidHours}">\n				<input type="text" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-mousewheel="incrementHours()" ng-readonly="readonlyInput" maxlength="2">\n			</td>\n			<td>:</td>\n			<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidMinutes}">\n				<input type="text" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-readonly="readonlyInput" maxlength="2">\n			</td>\n			<td ng-show="showMeridian"><button type="button" class="btn btn-default text-center" ng-click="toggleMeridian()">{{meridian}}</button></td>\n		</tr>\n		<tr class="text-center">\n			<td><a ng-click="decrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n			<td>&nbsp;</td>\n			<td><a ng-click="decrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n			<td ng-show="showMeridian"></td>\n		</tr>\n	</tbody>\n</table>\n'
      );
    },
  ]),
  angular.module("template/typeahead/typeahead-match.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/typeahead/typeahead-match.html",
        '<a tabindex="-1" bind-html-unsafe="match.label | typeaheadHighlight:query"></a>'
      );
    },
  ]),
  angular.module("template/typeahead/typeahead-popup.html", []).run([
    "$templateCache",
    function (a) {
      a.put(
        "template/typeahead/typeahead-popup.html",
        '<ul class="dropdown-menu" ng-show="isOpen()" ng-style="{top: position.top+\'px\', left: position.left+\'px\'}" style="display: block;" role="listbox" aria-hidden="{{!isOpen()}}">\n    <li ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)" role="option" id="{{match.id}}">\n        <div typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>\n'
      );
    },
  ]);
