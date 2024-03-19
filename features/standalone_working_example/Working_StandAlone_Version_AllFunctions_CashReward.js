// Run with node,
// It will navigate to the offers page,
// Count the number of offers,
// scroll the carousel forwards 2 times
// Compare the before and after offers to ensure the scroll was successful and has unique offers (unless there is only 1 page of offers then it will console out an error)


//import { title } from "process";
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
// Import the necessary modules from selenium-webdriver
var chrome = require('selenium-webdriver/chrome');
var webdriver = require('selenium-webdriver');
var service = new chrome.ServiceBuilder('C:\\roboframework\\WebDrivers\\chromedriver.exe').build();
var options = new chrome.Options();
// options.addArguments('--enable-logging', '--auto-open-devtools-for-tabs');
// Create a new WebDriver instance
var driver = chrome.Driver.createSession(options, service);
// Navigate to a webpage
(function test() {
    return __awaiter(this, void 0, void 0, function () {
        function ScrollForwards(rElements, rOffers, screentoScroll) {
            return __awaiter(this, void 0, void 0, function () {
                var previousOffers, activeOffers, _a, _b, scrollSuccessful;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, allOffers_1(rOffers)];
                        case 1:
                            // Scrape all the offer elements using xpath
                            updateAllOffers_1 = _c.sent();
                            return [4 /*yield*/, visibleOffers_1(updateAllOffers_1)];
                        case 2:
                            previousOffers = _c.sent();
                            console.log("Previous Offers: " + JSON.stringify(previousOffers));
                            _a = forwards_1;
                            return [4 /*yield*/, rElements];
                        case 3:
                            _b = [_c.sent(), rOffers];
                            return [4 /*yield*/, screenWidth_1.width];
                        case 4: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c.sent(), screentoScroll]))];
                        case 5:
                            activeOffers = _c.sent();
                            scrollSuccessful = tileCompare_1(previousOffers, activeOffers);
                            console.log("Scroll Successful?: " + scrollSuccessful);
                            return [2 /*return*/, updateAllOffers_1];
                    }
                });
            });
        }
        var rawList_xpath, rawOffers_xpath_1, rawOffer_Tile_1, rawOffer_Discount_1, rawOffer_Commison_1, rawOfferActive_1, rawOfferLink_1, elements, returnedElements, offers, returnedOffers, _a, _b, _c, _d, allOffers_1, visibleOffers_1, updateAllOffers_1, _e, resultantVisibleOffers, screenWidth_1, numScreensToScroll, _f, _g, totalScrollWidth, ScrollPosition_1, forwards_1, backwards, tileCompare_1, refreshElements, refreshOffers, numScreens, masterOfferList;
        var _this = this;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _h.trys.push([0, , 17, 19]);
                    return [4 /*yield*/, driver.get('https://www.cashrewards.com.au/shop')];
                case 1:
                    _h.sent();
                    driver.manage().logs().get('browser').then(function (logs) {
                        logs.forEach(function (log) {
                            console.log(log.message);
                        });
                    });
                    rawList_xpath = "*//div[@data-test-id='featured-offers-carousel']//div[@data-test-id='list']";
                    rawOffers_xpath_1 = "*[@data-slide-intersection-ratio]";
                    rawOffer_Tile_1 = "//span[@data-test-id='card-content-title']";
                    rawOffer_Discount_1 = "//span[@data-test-id='offer-card-discount']";
                    rawOffer_Commison_1 = "//span[@data-test-id='offer-card-commission']";
                    rawOfferActive_1 = "data-slide-intersection-ratio";
                    rawOfferLink_1 = ".//a";
                    return [4 /*yield*/, driver.findElement(webdriver.By.xpath(rawList_xpath))];
                case 2:
                    elements = _h.sent();
                    return [4 /*yield*/, elements];
                case 3:
                    returnedElements = _h.sent();
                    offers = function (rawList) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, rawList.findElements(webdriver.By.xpath(rawOffers_xpath_1))];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); };
                    _a = offers;
                    return [4 /*yield*/, returnedElements];
                case 4: return [4 /*yield*/, _a.apply(void 0, [_h.sent()])];
                case 5:
                    returnedOffers = _h.sent();
                    _c = (_b = console).log;
                    _d = ['s_Total Offers Count:'];
                    return [4 /*yield*/, returnedOffers.length];
                case 6:
                    _c.apply(_b, _d.concat([_h.sent()]));
                    allOffers_1 = function (offerTiles) { return __awaiter(_this, void 0, void 0, function () {
                        var allCards, count, _i, _a, offerTile, visible, activeOffer, offeridValue, offerUrl, discountText, titleText, offerCard, activeOffer_1, _b, error_1, offerid, offerUrlElement, offerTitle, error_2, offerDiscount, error_3, offerDiscount, error_4;
                        var _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    console.log("# in function allOffers.....");
                                    allCards = [];
                                    count = 0;
                                    _i = 0;
                                    return [4 /*yield*/, offerTiles];
                                case 1:
                                    _a = _d.sent();
                                    _d.label = 2;
                                case 2:
                                    if (!(_i < _a.length)) return [3 /*break*/, 28];
                                    offerTile = _a[_i];
                                    visible = false;
                                    activeOffer = 0.0;
                                    offeridValue = "";
                                    offerUrl = "";
                                    discountText = "";
                                    titleText = "";
                                    offerCard = { id: "", title: "", url: "", discount: "", active: false };
                                    _d.label = 3;
                                case 3:
                                    _d.trys.push([3, 5, , 6]);
                                    _b = parseFloat;
                                    return [4 /*yield*/, offerTile.getAttribute(rawOfferActive_1)];
                                case 4:
                                    activeOffer_1 = _b.apply(void 0, [_d.sent()]);
                                    if (activeOffer_1 >= 1) {
                                        visible = true;
                                        console.log('visible: ' + activeOffer_1);
                                    }
                                    return [3 /*break*/, 6];
                                case 5:
                                    error_1 = _d.sent();
                                    activeOffer <= 0.0;
                                    return [3 /*break*/, 6];
                                case 6: return [4 /*yield*/, offerTile.findElement(webdriver.By.xpath(rawOfferLink_1))];
                                case 7:
                                    offerid = _d.sent();
                                    return [4 /*yield*/, offerid.getAttribute("data-test-id")];
                                case 8:
                                    offeridValue = _d.sent();
                                    return [4 /*yield*/, offerTile.findElement(webdriver.By.xpath(rawOfferLink_1))];
                                case 9:
                                    offerUrlElement = _d.sent();
                                    return [4 /*yield*/, offerUrlElement.getAttribute("href")];
                                case 10:
                                    offerUrl = _d.sent();
                                    _d.label = 11;
                                case 11:
                                    _d.trys.push([11, 14, , 15]);
                                    return [4 /*yield*/, offerTile.findElement(webdriver.By.xpath(rawOffer_Tile_1))];
                                case 12:
                                    offerTitle = _d.sent();
                                    return [4 /*yield*/, offerTitle.getText()];
                                case 13:
                                    titleText = _d.sent();
                                    return [3 /*break*/, 15];
                                case 14:
                                    error_2 = _d.sent();
                                    titleText = "notfound";
                                    return [3 /*break*/, 15];
                                case 15:
                                    _d.trys.push([15, 18, , 19]);
                                    return [4 /*yield*/, offerTile.findElement(webdriver.By.xpath(rawOffer_Discount_1))];
                                case 16:
                                    offerDiscount = _d.sent();
                                    return [4 /*yield*/, offerDiscount.getText()];
                                case 17:
                                    discountText = _d.sent();
                                    return [3 /*break*/, 19];
                                case 18:
                                    error_3 = _d.sent();
                                    discountText = "notfound";
                                    return [3 /*break*/, 19];
                                case 19:
                                    if (!(discountText == "notfound")) return [3 /*break*/, 24];
                                    _d.label = 20;
                                case 20:
                                    _d.trys.push([20, 23, , 24]);
                                    return [4 /*yield*/, offerTile.findElement(webdriver.By.xpath(rawOffer_Commison_1))];
                                case 21:
                                    offerDiscount = _d.sent();
                                    return [4 /*yield*/, offerDiscount.getText()];
                                case 22:
                                    discountText = _d.sent();
                                    return [3 /*break*/, 24];
                                case 23:
                                    error_4 = _d.sent();
                                    discountText = "notfound";
                                    return [3 /*break*/, 24];
                                case 24:
                                    _c = { id: offeridValue };
                                    return [4 /*yield*/, titleText];
                                case 25:
                                    _c.title = _d.sent();
                                    return [4 /*yield*/, discountText];
                                case 26:
                                    // Update Array of Offer Objects
                                    offerCard = (_c.discount = _d.sent(), _c.url = offerUrl, _c.active = visible, _c);
                                    allCards.push(offerCard);
                                    _d.label = 27;
                                case 27:
                                    _i++;
                                    return [3 /*break*/, 2];
                                case 28:
                                    ;
                                    return [2 /*return*/, allCards];
                            }
                        });
                    }); };
                    visibleOffers_1 = function (offerList) { return __awaiter(_this, void 0, void 0, function () {
                        var activeOfferIdTitle, _i, offerList_1, activeOffers;
                        return __generator(this, function (_a) {
                            console.log("# in function visibleOffers.....");
                            activeOfferIdTitle = [];
                            for (_i = 0, offerList_1 = offerList; _i < offerList_1.length; _i++) {
                                activeOffers = offerList_1[_i];
                                if (activeOffers.active == true) {
                                    activeOfferIdTitle.push({ id: activeOffers.id });
                                }
                            }
                            return [2 /*return*/, activeOfferIdTitle];
                        });
                    }); };
                    _e = allOffers_1;
                    return [4 /*yield*/, offers(returnedElements)];
                case 7: return [4 /*yield*/, _e.apply(void 0, [_h.sent()])];
                case 8:
                    updateAllOffers_1 = _h.sent();
                    return [4 /*yield*/, visibleOffers_1(updateAllOffers_1)];
                case 9:
                    resultantVisibleOffers = _h.sent();
                    console.log('Active Offers Total Count:', resultantVisibleOffers.length);
                    console.log('Active Offer Details:', JSON.stringify(resultantVisibleOffers));
                    return [4 /*yield*/, driver.manage().window().getRect()];
                case 10:
                    screenWidth_1 = _h.sent();
                    console.log("Calc1__screenWidth: ", screenWidth_1.width);
                    _g = (_f = Math).ceil;
                    return [4 /*yield*/, returnedOffers.length];
                case 11:
                    numScreensToScroll = _g.apply(_f, [(_h.sent()) / resultantVisibleOffers.length]);
                    console.log("Calc2__numscreensToScroll:", numScreensToScroll);
                    totalScrollWidth = function (numOfScrolls) {
                        (numOfScrolls * screenWidth_1.width);
                        return (numOfScrolls * screenWidth_1.width);
                    };
                    console.log("Calc3__totalScrollWidth:", totalScrollWidth(numScreensToScroll));
                    ScrollPosition_1 = function (elem) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, driver.executeScript("return arguments[0].scrollLeft", elem)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); };
                    forwards_1 = function (rElements, rOffers, screenRes, scrollSize) { return __awaiter(_this, void 0, void 0, function () {
                        var scrollPos, activeCardTiles, updateAllOffers_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, ScrollPosition_1(rElements)];
                                case 1:
                                    scrollPos = _a.sent();
                                    console.log("Scrolling Forwards ... ");
                                    if (!(scrollPos < scrollSize)) return [3 /*break*/, 6];
                                    return [4 /*yield*/, driver.executeScript("arguments[0].scrollLeft += ".concat(screenRes), rElements)];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, ScrollPosition_1(rElements)];
                                case 3:
                                    scrollPos = _a.sent();
                                    activeCardTiles = [];
                                    return [4 /*yield*/, allOffers_1(rOffers)];
                                case 4:
                                    updateAllOffers_2 = _a.sent();
                                    return [4 /*yield*/, visibleOffers_1(updateAllOffers_2)];
                                case 5:
                                    activeCardTiles = _a.sent();
                                    return [2 /*return*/, activeCardTiles];
                                case 6:
                                    console.log("No more offers, end of List, scroll backwards instead");
                                    _a.label = 7;
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); };
                    backwards = function (rElements, rOffers, screenRes, scrollSize) { return __awaiter(_this, void 0, void 0, function () {
                        var scrollPos, activeCardTiles, updateAllOffers_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, ScrollPosition_1(rElements)];
                                case 1:
                                    scrollPos = _a.sent();
                                    console.log("Scrolling Backwards ... ");
                                    if (!(scrollPos >= screenRes)) return [3 /*break*/, 6];
                                    return [4 /*yield*/, driver.executeScript("arguments[0].scrollLeft -= ".concat(screenRes), rElements)];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, ScrollPosition_1(rElements)];
                                case 3:
                                    scrollPos = _a.sent();
                                    activeCardTiles = [];
                                    return [4 /*yield*/, allOffers_1(rOffers)];
                                case 4:
                                    updateAllOffers_3 = _a.sent();
                                    return [4 /*yield*/, visibleOffers_1(updateAllOffers_3)];
                                case 5:
                                    activeCardTiles = _a.sent();
                                    return [2 /*return*/, activeCardTiles];
                                case 6:
                                    console.log("No more offers to display, At Beginning of List");
                                    _a.label = 7;
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); };
                    tileCompare_1 = function (previousActOffers, currentActOffers) {
                        console.log("Comparing Tiles...");
                        if (!previousActOffers || !currentActOffers) {
                            return true;
                        }
                        var previous = previousActOffers.map(function (item) { return item.id; });
                        var current = currentActOffers.map(function (item) { return item.id; });
                        if (previousActOffers.length != currentActOffers.length) {
                            return true;
                        }
                        else {
                            for (var i = 0; i < previous.length; i++) {
                                if (previous[i] != current[i]) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            }
                        }
                    };
                    return [4 /*yield*/, elements];
                case 12:
                    refreshElements = _h.sent();
                    return [4 /*yield*/, offers(refreshElements)];
                case 13:
                    refreshOffers = _h.sent();
                    numScreens = totalScrollWidth(numScreensToScroll);
                    return [4 /*yield*/, allOffers_1(refreshOffers)];
                case 14:
                    masterOfferList = _h.sent();
                    // Scroll away x2 screen worth
                    return [4 /*yield*/, ScrollForwards(refreshElements, refreshOffers, numScreens)];
                case 15:
                    // Scroll away x2 screen worth
                    _h.sent();
                    return [4 /*yield*/, ScrollForwards(refreshElements, refreshOffers, numScreens)];
                case 16:
                    _h.sent();
                    return [3 /*break*/, 19];
                case 17:
                // Close the browser
                return [4 /*yield*/, driver.quit()];
                case 18:
                    // Close the browser
                    _h.sent();
                    return [7 /*endfinally*/];
                case 19: return [2 /*return*/];
            }
        });
    });
})();
// Determine the number of cards in the view
// I noticed that cards that are visibile have a data-slide-intersection-ratio greater than 1 therefore based on this detail..
// I can determine the width of all the card and scroll to the end of the cards.
