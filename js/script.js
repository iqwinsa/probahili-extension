document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        // console.log('document.readyState == "complete"');
        //initScriptInter = setInterval(function () {
        initScript();
       //}, 500);
    }
};

// Свойства
var moySkladRequest = {
    'items': {},
};

var OrderItems = {
    'items': {},
};

var OrderParams = {
    'store': {
        'id': '',
        'value': '',
        'retailcode': ''
    }
};

var retailCRM_apiKey = localStorage.apiKey ?? undefined;
var retailCRM_host = window.location.host.split(".")[0];
var retailCRM_origin = window.location.origin;
// ==================

var retailCRM = {

    init: function (initAction = '') {

        if(initAction == 'callHistory'){
            // UsersTelphinAndCRMParams = {'ids': {}};
            // retailCRM.initParserTelphinIsSip();
        }
        else if(initAction == 'OrderOstatki'){                     
            OrderParams = {
                'store' : {
                    'id' : '',
                    'value' : '',
                    'retailcode': ''
                }
            }

            OrderItems = {
                'items': {},
            };    
                    
            retailCRM.getStoreOrder();
            retailCRM.orderTopFormOstatkiEvent();

        }
    },

    orderPopupFormClose: function () {             
        let btn_close_popup = window.document.querySelector('#order-product-popup .rt-col .close');
        if (btn_close_popup) {
            // событие клик по кнопке добавить заказ
            btn_close_popup.addEventListener('click', function () {
                console.log("******");
                retailCRM.retailNewInventories();
                // инициализация кнопки клика на получение запроса информации
                // retailCRM.orderBasketOstatkiPress();
            }, false);
        }
    },

    orderTopFormOstatkiEvent: function () {
        if ($('body').find("#top_order_ostatki_is_prd").length == 0) {
            // console.log("orderTopFormOstatkiEvent");
            // $('#content-wrapper').prepend(retailCRM.showTopFormOstatkiHTML());
            let topFormSelector = ($(".order-header").length > 0) ? $(".order-header") : $('.m-box.mn-or-info');
            // console.log(selectStyle);
            topFormSelector.prepend(retailCRM.showTopFormOstatkiHTML());
            $('#order-list .collapse-section__head-content .bk-btn').prepend(retailCRM.showBtnOstatkiHTML());     
            
            // вывод остатков RetailCRM
            retailCRM.retailNewInventories(); 

            // инициализация кнопки клика на получение запроса информации
            retailCRM.orderBasketOstatkiPress();  

            // инициализация кнопки закрытия окна попап на добавление товаров
            retailCRM.orderPopupFormClose();        

            var h_hght = 30; // высота шапки
            var h_hght_ = $("#top_order_ostatki_is_prd").outerHeight(true); // высота шапки
            var h_mrg = 0;     // отступ когда шапка уже не видна
            $(function () {

                $(window).scroll(function () {

                    var topDocument = $(document).scrollTop();
                    var top = $(this).scrollTop();
                    var elem = $('.bg_top_order_ostatki_is_prd');

                    elem.attr("data-top_page", topDocument);

                    if (top + h_mrg < h_hght_) {
                        elem.removeClass('fixed_scroll');
                    } else {
                        // elem.css('top', h_mrg);
                        elem.addClass('fixed_scroll');
                    }
                });
            });
        }

        if ($('body').find("#intaro_crmbundle_ordertype_shipmentStore").length > 0 || $("#order-shipment-store").length > 0) {
            
            // let shipmentStoreVal = '';
            // if ($("#order-shipment-store").length > 0) {
            //     shipmentStoreVal = $("#order-shipment-store").text();
            // } else {
            //     shipmentStoreVal = $("#intaro_crmbundle_ordertype_shipmentStore option:selected").text();
            // }
            // let shipmentStoreVal = $("#intaro_crmbundle_ordertype_shipmentStore option:selected").text();        
          
            let deliveryDate = $("#intaro_crmbundle_ordertype_deliveryDate").val() ?? "";
            let deliveryTime_from = $("#intaro_crmbundle_ordertype_deliveryTime_from").val() ?? "";
            let deliveryTime_to = $("#intaro_crmbundle_ordertype_deliveryTime_to").val() ?? "";

            let deliveryInfo_text = "";

            if (deliveryDate != "") {
                deliveryInfo_text = deliveryDate;
            } 
    
            if (deliveryTime_from != "") {
                deliveryInfo_text += " c " + deliveryTime_from + " по " + deliveryTime_to;
            }
           //  console.log(shipmentStoreVal);
            // console.log(OrderParams["store"]["id"]);
            
            $("#top_order_ostatki_is_prd .b_item_order_params[data-type='sklad'] .b_params_val").text(OrderParams.store.value);
            $("#top_order_ostatki_is_prd .b_item_order_params[data-type='date-tame'] .b_params_val").text(deliveryInfo_text);
            // console.log(retailCRM.getStoreOrder()["id"]);
        }

    },

    getStoreOrder: function() {
       // if ($('body').find("#intaro_crmbundle_ordertype_shipmentStore").length > 0 || $("#order-shipment-store").length > 0) {
            let shipmentStoreVal = '';
            let shipmentStoreId = '';

            if ($("#order-shipment-store").length > 0) {
                shipmentStoreVal = $("#order-shipment-store").text();
                shipmentStoreId = $("#order-shipment-store").data("id");
            } else {
                shipmentStoreVal = $("#intaro_crmbundle_ordertype_shipmentStore option:selected").text();
                shipmentStoreId = parseInt($("#intaro_crmbundle_ordertype_shipmentStore option:selected").val());
            }

            OrderParams["store"]["id"] = shipmentStoreId;
            OrderParams["store"]["value"] = shipmentStoreVal;

            switch (shipmentStoreId) {
                case 7:
                    OrderParams["store"]["retailcode"] = "volga";
                    break;
                case 45:
                    OrderParams["store"]["retailcode"] = "a1";
                    break;
                case 78:
                    OrderParams["store"]["retailcode"] = "a1-msk";
                    break;
                case 79:
                    OrderParams["store"]["retailcode"] = "sadovaya";
                    break;
                default:
                    OrderParams["store"]["retailcode"] = "volga";
                    break;
            }   

        retailCRM.orderProductLightning();

            // console.log(OrderParams);
    },

    orderBasketGetter: function (requestType = "retailcrm") {        
        OrderItems = {
            'items': { },
        };

        console.log("order Basket Getter");
        $("#order-products-table tbody").each(function (el, th) {            

            if ($(th).find(".order-product .reference-td .vendor-code").text() != '' || $(th).find(".order-product .reference-td").text() != '') {              
            
                let offer_id = $(th).find(".order-product").attr("data-offer-id");
                
                let prdVendorCode = $(th).find(".order-product .reference-td .vendor-code").text();
                if (prdVendorCode == '' || prdVendorCode == undefined || prdVendorCode == 'undefined') {
                    prdVendorCode = $(th).find(".order-product .reference-td").text();
                }

                let xmlId = $(th).find(".order-product .status .product-status-wrap .pack-row-retailcrm").attr("data-xmlid") ?? undefined;
                let moySkladStocksYet = $(th).find(".moysklad_stocks").length > 0 ? true : false;

                let isArchivePosition = $(th).find(".order-product .title span.tr-link").length > 0 ? true : false;
                // console.log(archiveProduct);
                let isArchiveHtml = "";

                if (xmlId == undefined && !isArchivePosition) {   
                    // console.log("pusto - ok ");                    
                    OrderItems["items"][$(th).find('.order-product').attr("data-offer-id")] = {
                        offer_id: $(th).find('.order-product').attr("data-offer-id"),
                        // xmlId: xmlId
                    };
                } else if (requestType == "moysklad" && !moySkladStocksYet && xmlId != undefined) {
                    OrderItems["items"][$(th).find('.order-product').attr("data-offer-id")] = {                        
                        xmlId: xmlId
                    };
                } else if (isArchivePosition) {
                    if ($(th).find(".order-product.toxic-archive-product").length === 0) {
                        $(th).find(".order-product").addClass("toxic-archive-product");   
                        isArchiveHtml = '<div class="moysklad_archive__info" id="is-archive-position">';
                        isArchiveHtml += 'Товар не связан с МойСклад. <br/> Его нужно удалить в Ритейле и в МойСклад отдельно!'  
                        isArchiveHtml += '</div>'              
                        $(th).find(".order-product .store .pack-row").append(isArchiveHtml);
                    }
                }
                // console.log(xmlId);
                // console.log(OrderItems["items"]);
            }
        });
        // console.log("basketParse - result in OrderItems");
        // console.log(OrderItems.items); 
    },

    orderBasketOstatkiPress: function () {
        let btn_moysklad_response = window.document.querySelector('#order-list .btn_show_info');
        if (btn_moysklad_response) {
            // событие клик по кнопке остатки
            btn_moysklad_response.addEventListener('click', function () {
                // ('<div class="clock-loader"></div>');                
                // $("#ms-query").attr('disabled', 'disabled');
                console.log('clickOstatkiPres'); 
                retailCRM.getInfoFromMoySklad();
                console.log("basketParse - result"); 
            }, false);
        }
    },

    getInfoFromMoySklad: function () {

        retailCRM.orderBasketGetter("moysklad"); // Получаем список товаров
        let itemsToMs = OrderItems.items;
        let store_id = OrderParams.store.id;
        
        let btn_moysklad_response = $('#order-list .btn_show_info');
        btn_moysklad_response.attr("disabled", "disabled");

        // console.log(itemsToMs);

        if ($(".order-main-box .order-head.cleared .order-num.ft-lt span").length > 0) {
            order_id = $(".order-main-box .order-head.cleared .order-num.ft-lt span").text();
        }

        let paramsOstatki = {
            xmlId: itemsToMs,
            site: retailCRM_host,
            stockId: store_id
        };

        console.log(paramsOstatki);

        let pathServer = 'https://xn--80abwmlfh7b4c.xn--p1ai/integrations/extension_stocks/moysklad_request_new.php'

        let msRequest = awFetchRequest(pathServer, paramsOstatki);
        // console.log(msRequest);
        msRequest.then(function (response) {
            // console.log(response);
            if (typeof response == 'object') { // object
                // console.log("Server");                
                if (!response.errors) {
                    moySkladRequest["items"] = response;         
                    for (key in moySkladRequest["items"]) {
                        let stock_html = '';
                        let moySkladStocks = moySkladRequest["items"][key];
                        let productPositionDiv = $("#order-products-table tbody .order-product[data-offer-id='" + key + "'] .store .pack-row");
                        let btnToMsCardLink = $("#order-products-table tbody .order-product[data-offer-id='" + key + "'] .product-status-wrap .pack-row-retailcrm");
                        let purchasePriceDiv = $("#order-products-table tbody .order-product[data-offer-id='" + key + "'] .purchase-price");
                        let salePriceDiv = $("#order-products-table tbody .order-product[data-offer-id='" + key + "'] .price .product-price");

                        stock_html = "<div class='moysklad_stocks'>";
                        stock_html += "<div class='moysklad_stocks__info'>";
                        if (!isEmpty(moySkladStocks) && typeof moySkladStocks == 'object') {
                            // console.log(moySkladStocks);
                            stock_html += moySkladStocks["storeName"] + " @ <div class='in-stock'>Доступно: " + moySkladStocks["quantity"] + "</div></div>";
                            stock_html += "<div class='more-info'><div class='available'>На складе лежит: " + moySkladStocks["stock"] + "</div>";                            
                            stock_html += "<div class='reserved'>В резерве: " + moySkladStocks["reserve"] + "</div></div>";
                            if (moySkladStocks["inTransit"] > 0) {
                                stock_html += "<div class='waiting'>Ожидаем на складе: " + moySkladStocks["inTransit"] + "</div>";
                            } else {
                                stock_html += "<div class='not-waiting'>Поступлений не запланировано.</div>";
                            }
                            if (moySkladStocks["minPrice"] != null) {
                                salePriceDiv.append("<span class='moysklad-additional-info' id='min-price' data-min-price=" + moySkladStocks["minPrice"] + ">Мин.: " + moySkladStocks["minPrice"] + " <span class='currency-symbol rub'>₽</span></span>");
                            }
                            if (moySkladStocks["selfPrice"] != null) {
                                // stock_html += "<div class='moysklad-additional-info'>Себес.: " + moySkladStocks["selfPrice"] + ", хранятся " + moySkladStocks["stockDays"] + "</div>";
                                purchasePriceDiv.append("<span class='moysklad-additional-info' id='self-price' data-self-price=" + moySkladStocks["selfPrice"] + ">Ост.: " + moySkladStocks["selfPrice"] + " <span class='currency-symbol rub'>₽</span></span>");
                            } 
                            if (moySkladStocks["cardBuyPrice"] != null) {
                                purchasePriceDiv.append("<span class='moysklad-additional-info' id='ms-card-price' data-card-price=" + moySkladStocks["cardBuyPrice"] + ">МС: " + moySkladStocks["cardBuyPrice"] + " <span class='currency-symbol rub'>₽</span></span>");
                            }
                            // if (moySkladStocks["uihref"] != "") stock_html += "<div class='moysklad_link'><button target='_blank' href=" + moySkladStocks["uihref"] + ">Карточка в МС</button></div>";
                        } else {
                            stock_html += "Возникла ошибка."
                        }                        
                        stock_html += "</div></div>";

                        productPositionDiv.append(stock_html);

                        if (moySkladStocks["uihref"] != "") {
                            btnToMsCardLink.append("<div class='moysklad_link'><a target='_blank' href=" + moySkladStocks["uihref"] + ">Карточка в МС</button></div>");
                        }

                    }
                } else {
                    console.log(response.errors);
                }
            }
            // btn_moysklad_response.removeAttr("disabled");
        })
        .catch(function (e) {
            console.log(e); // "oh, no!"
        })        
    },

    getAjaxAsync: function (path, params, typeRequest = "GET", dataType = "JSON") {  
        let res;

        try {
            res = $.ajax({
                url: path,
                type: typeRequest,
                dataType: dataType,
                data: params
            });
            return res;
        } catch (error) {
            console.log(error);
        }       
    },

    orderProductLightning: function () {
        let retailStoreCode = OrderParams.store.retailcode;
        console.log(retailStoreCode);    
        $("#order-products-table tbody").each(function (el, th) {   
            // console.log($(th));
            let currentQnt = parseInt($(th).find(".order-product .min-input.quantity.order-value-input").val());
            let storeQnt = parseInt($(th).find(".order-product .pack-row-retailcrm #" + retailStoreCode + " span").text());
            
            $(th).find(".order-product").removeClass("product_in_stock");
            $(th).find(".order-product").removeClass("product_out_stock");

            if (storeQnt >= currentQnt) {     
                // console.log("instock");       
                $(th).find(".order-product").addClass("product_in_stock");
            } else {
                // console.log("outofstock");
                $(th).find(".order-product").addClass("product_out_stock");
            }
        });
    },

    retailNewInventories: function () {    

        retailCRM.orderBasketGetter();
        // console.log("retailNewInventories");
        // console.log(OrderItems.items);
        // console.log(OrderParams.store);
        let retailOrderItems = Object.keys(OrderItems["items"]);

        if (retailOrderItems.length === 0) return false;

        let paramsRetail = {
            limit: 250,
            filter: {
                details: 1,
                ids: retailOrderItems
            },
            apiKey: retailCRM_apiKey,
        };
        
        let pathResponse = retailCRM_origin + "/api/v5/store/inventories";

        retailCRM.getAjaxAsync(pathResponse, paramsRetail)
        .then(function (data) { 
            let dataOffers = data["offers"];                             
            for (let offer of dataOffers) {                
                let xmlId = offer["xmlId"];                    
                // let stores = offer.stores.filter(e => e.store == 'volga' || e.store == "a1" || e.store == "a1-msk");
                // stores = stores.sort().reverse();
                let stores = offer.stores.filter(e => e.store == 'a1' || e.store == "sadovaya");
                let mapped = stores.map(function(el, i) {
                    // return console.log(el);
                    return { index: i, value: el.store.toLowerCase() };
                });

                mapped.sort(function(a, b) {
                    if (a.value > b.value) {
                        return 1; }
                    if (a.value < b.value) {
                        return -1; }
                    return 0;
                });

                stores = mapped.map(function(el) {
                    return stores[el.index];
                })
                // .reverse();

                // console.log(stores);
                
                retail_stock_html = '<div class="pack-row-retailcrm" data-xmlid="' + xmlId + '">';
                retail_stock_html += '<div class="retailcrm-available">Остаток</div>';

                for (let st of stores) {
                    // console.log(stores);
                    let legitStockName = "";
                    let stockQnt = st["quantity"] ?? 0;
                    switch (st["store"]) {
                        case "roza":
                            legitStockName = "СПБ, Роза"
                            break;
                        case "volga":
                            legitStockName = "МСК, Волга"
                            break;
                        case "a1":
                            legitStockName = "СПБ, А1"
                            break;
                        case "a1-msk":
                            legitStockName = "МСК, A1"
                            break;
                        case "sadovaya":
                            legitStockName = "СПБ, ПВЗ"
                            break;
                    }                      
                    retail_stock_html += '<div class="select-stock" data-quantity=' + stockQnt + ' id='+ st["store"] + '>';
                    retail_stock_html += legitStockName + ' <span>' + stockQnt + '</span>';
                    retail_stock_html += '</div>';
                }
                retail_stock_html += '</div></div>';
                if ($("#order-products-table tbody .order-product[data-offer-id='" + offer.id + "'] .status .product-status-wrap").find("pack-row-retailcrm").length === 0) {
                    $("#order-products-table tbody .order-product[data-offer-id='" + offer.id + "'] .status .product-status-wrap").append(retail_stock_html);
                }
                // pos.append(retail_stock_html);
                retailCRM.orderProductLightning();
            }
            $("#ms-query").removeAttr('disabled');
        })
        .catch(function (err) {
            console.log(err);
        });

        // ajax_response.fail(function (jqXHR, textStatus, errorThrown) {
        //     console.log(textStatus + ': ' + errorThrown);
        // })
    },

	showTopFormOstatkiHTML: function () {
        let TopFormOstatki;
        TopFormOstatki = "<div class='bg_top_order_ostatki_is_prd'>" +
            "<div class='container top_order_ostatki_is_prd' id='top_order_ostatki_is_prd'>" +
            // "<div class='b_left st_padding_56'>" +
            "<div class='b_item_order_params' data-type='sklad'><span class='b_params_val'></span></div>" +
            "<div class='b_item_order_params' data-type='date-tame'><span class='b_params_val'></span></div></div>" +
            "<div class='b_right'>" +
            "<div class='container_list_prd'>" +
            "<div class='b_prd_list' id='b_stow_prd_list'>" +
            "<div class='b_left'></div>" +
            "<div class='b_right' data-www='111'></div><div class='clear'></div>" +
            "</div></div>" +
            // "</div>" +
            // "<div class='b_all_goods'><a href='https://semicvetic.com/include_areas/goods/' target='_blank'>все остатки</a></div>" +
            "<div class='clear'></div>" +
            // "<div class='btn_show_info'>остатки</div>" +
            // "<div class='btn_action_is_block' data-action_show='Показать' data-action_hide='Скрыть'>Показать</div>" +
            "</div>" + 
            "</div>";
        return TopFormOstatki;
    },

    showBtnOstatkiHTML: function () {
        let BtnOstatki;
        BtnOstatki = "<a class='btn white small ms-request-button btn_show_info' id='ms-query' disabled>" +
            "Смотреть остатки <span class='icon-ms'></span></a>";
        return BtnOstatki;
    },

    moySkladCustomerLink: function() {
        let customClientFields = $(".grid__table.grid__table_border-top tbody tr");    
        $.each(customClientFields, function (index, field) {        
            if (field.innerText.indexOf("Идентификатор в системе МойСклад") + 1 > 0) {
                let msCustomerId = $(field).find("td")[1].innerText;
                // console.log(msCustomerId);
               
                // console.log($(field).text().replace(/\s/g, ''));
                // console.log($(field).text().replace(/[^0-9-]/g, ''));
                // console.log($(field).html().replace(/[^0-9-]/g, ''));
            }      
        });
    },

    downloadRecords: function() {        
        $.each($(".call-record"), function (key, val) {
            // if ($(this).find(".download-link-audio").length === 0) { 
            //     $(this).css("width", "100px");         
            //     var dwnldLink = $(this).attr("data-src");            
            //     $(this).append('<div class="download-link-audio actions"><div class="action start download"><a href=' + dwnldLink + '>DWNLD</a></div></div>');
            // }
        });
    }
}

var moySklad = {
    init: function(initAction = "") {
        if (initAction == "moySkladOrder") {
            console.log("Ms Inited");
        }
    }
}

function initScript() {
    var pathname;
    // =======================================
    initScriptInter = setInterval(function () {

        pathname = document.location.pathname;

        if (document.URL.indexOf('retailcrm.ru/') != "-1" && (retailCRM_apiKey === undefined || retailCRM_apiKey === "undefined")) {
            console.log("We Need to Get Api Key");
            getRetailCRMApiKey();
        }

        if (document.URL.indexOf('retailcrm.ru/orders/add') != "-1" || (pathname.indexOf('/edit') != "-1" && pathname.indexOf('/orders/') != "-1")) {
            actionAddProduct(); // Манипуляции с кнопкой добавить товар
			console.log("/orders/ edit or add");
            // обновлеяем корзину
            retailCRM.init('OrderOstatki');

        } else if (document.URL.indexOf('retailcrm.ru/orders/') != "-1") {   
			console.log("/orders/ btnAddOrder();");
			btnAddOrder();
            
        } else if (document.URL.indexOf('retailcrm.ru/customers-corporate/') != "-1") {
            console.log("customers Corporate");      
            retailCRM.moySkladCustomerLink();      
            // btnAddOrder();
        }
        
        else if (document.URL.indexOf('moysklad.ru/app/#customerorder/') != "-1") {
            // console.log("Moy Sklad Order");     
            moySklad.init("moySkladOrder");
            // retailCRM.moySkladCustomerLink();      
            // btnAddOrder();
        }

        else if (document.URL.indexOf("#t-log-calls") != "-1") {
            // console.log("T-log-calls");
            retailCRM.downloadRecords();
        }

    }, 500);

    if (document.URL.indexOf('/admin/integration/telphin_new/edit') != "-1") { //
		console.log("telphin")
       // retailCRM.init('telphin');
    }
}

function btnAddOrder() {
    var btn_add_order = window.document.querySelector('.btn-wrapper.new a[href="/orders/add"]');
	// console.log(btn_add_order);
    if (btn_add_order) {
        // событие клик по кнопке добавить заказ
        btn_add_order.addEventListener('click', function () {
            actionAddProduct();
			console.log("ok");
        }, false);
    }
}

function actionAddProduct() {
    if (document.URL.indexOf('retailcrm.ru/orders/add') != "-1") {		
        var SelectShops = window.document.getElementById("intaro_crmbundle_ordertype_site");
		
        if (SelectShops) {
            var selectedOptions = SelectShops.selectedOptions;
            var valueSelect = selectedOptions[0].value;
        }

        if (valueSelect == '' || valueSelect == undefined || valueSelect === false) {

            var add_order_product_btn = window.document.getElementById('add-order-product-btn');

            if (add_order_product_btn) {
                // скрываем кнопку добавить товар
                add_order_product_btn.style.display = 'none';

                //
                /*var newElement = document.createElement("div");
                newElement.idName = "btn_show_warning";
                newElement.innerHTML = "Добавить товар";
                // добавляем перед
                add_order_product_btn.before(newElement);*/


                // проверяем наличие div c id=btn_show_warning_2
                if (window.document.getElementById('btn_show_warning_2')) {
                    window.document.getElementById('btn_show_warning_2').remove();
                }

                add_order_product_btn.insertAdjacentHTML(
                    'beforebegin',
                    '<div id="btn_show_warning_2">Перед добавлением товара необходимо выбрать <a href="#intaro_crmbundle_ordertype_site">Магазин</a></div>');


                /*add_order_product_btn.addEventListener('click', eventAddProductOrder, false);
                function eventAddProductOrder() {
                    console.log("click Select");
                }*/

                document.getElementById('intaro_crmbundle_ordertype_shipmentStore').value = "7";

                // выбор магазина
                var SelectShops_chosen = window.document.getElementById("intaro_crmbundle_ordertype_site_chosen");
                SelectShops_chosen.addEventListener('click', function () {
                    var btn_show_warning_2 = window.document.getElementById('btn_show_warning_2');

                    //console.log('select change');
                    var SelectShops2 = window.document.getElementById("intaro_crmbundle_ordertype_site");
                    var selectedOptions2 = SelectShops2.selectedOptions;
                    var valueSelect2 = selectedOptions2[0].value;

                    if (valueSelect2 != '' || valueSelect2 == undefined) {

                        // скроллим до адреса доставки
                        const el = document.getElementById('delivery-address-form');
                        el.scrollIntoView({behavior: "smooth"});

                        //
                        showBtnAddProduct();

                    } else {
                        btn_show_warning_2.style.display = 'block';
                        add_order_product_btn.style.display = 'none';
                    }
                }, false);

                // выбор типа доставки
                var deliveryType_chosen = window.document.getElementById("intaro_crmbundle_ordertype_deliveryType_chosen");
                deliveryType_chosen.addEventListener('click', function () {

                    const selectDeliveryType = window.document.getElementById("intaro_crmbundle_ordertype_deliveryType");
                    const DeliveryTypeOptions = selectDeliveryType.selectedOptions;
                    const DeliveryTypeValue = DeliveryTypeOptions[0].value;
                    //const btn_show_warning_2 = window.document.getElementById('btn_show_warning_2');

                    console.log("change - " + DeliveryTypeValue);

                    if (DeliveryTypeValue != "") {
                        showBtnAddProduct();
                    }

                }, false);

                // выбор адреса доставки
                var deliveryAddress_street = window.document.getElementById("intaro_crmbundle_ordertype_deliveryAddress_street");
                deliveryAddress_street.addEventListener('focusout', function () {

                    // console.log("deliveryAddress_street");

                    //проверяем наличие div c id=btn_save_address_order
                    //if (window.document.getElementById('btn_save_address_order')) {
                    //    window.document.getElementById('btn_save_address_order').remove();
                    //}
                    // var btn_Address_street = window.document.querySelector('#intaro_crmbundle_ordertype_deliveryAddress_street');
                    // btn_Address_street.insertAdjacentHTML('beforebegin', '<div id="btn_save_address_order" style="cursor: pointer;position: absolute;top: 22px;right: 10px;border: 1px solid #cb5058; padding: 5px 10px; background: #cb5058; color: #fff;">Для того чтобы продолжить необходимо сохранить заказ !</div>');

                    //
                    showBtnAddProduct();

                }, false);

            }

        }
    }
}

async function awFetchRequest(url = '', data = {}) {
    let params = $.param(data);
    //console.log(url + "?" + params);
    let response = await fetch(url + "?" + params);
    if (response.ok) {
        // console.log(response);
        return await response.json()
    } else {
      return alert('error', response.status);
    }
}

function fixPage() {
    //document.body.style.overflow = 'hidden';
    //document.body.addEventListener('touchmove',function(event){event.preventDefault();},false);

    // save-box save-box_with-btns

    const btn_add_order = window.document.querySelector('.save-box.save-box_with-btns .wrapper');

    btn_add_order.setAttribute("style", "border: 2px solid red;");
}

function showBtnAddProduct() {

    const add_order_product_btn = window.document.getElementById('add-order-product-btn');
    const btn_show_warning_2 = window.document.getElementById('btn_show_warning_2');

    const SelectShops2 = window.document.getElementById("intaro_crmbundle_ordertype_site");
    const selectedOptions2 = SelectShops2.selectedOptions;
    const valueSelect2 = selectedOptions2[0].value;

    // адрес доставки
    const selectAddressStreet = window.document.getElementById("intaro_crmbundle_ordertype_deliveryAddress_street");
    const AddressStreetValue = selectAddressStreet.value;
    //var AddressStreetValue = AddressStreetOptions[0].value;

    // тип доставки
    const selectDeliveryType = window.document.getElementById("intaro_crmbundle_ordertype_deliveryType");
    const DeliveryTypeOptions = selectDeliveryType.selectedOptions;
    const DeliveryTypeValue = DeliveryTypeOptions[0].value;


    if (valueSelect2 != '' || valueSelect2 == undefined) {

        // смотрим если  не выбран тип доставки и
        //
        if (DeliveryTypeValue != "" || AddressStreetValue != "") {

            if (DeliveryTypeValue != "" && Number(DeliveryTypeValue) == 1 && AddressStreetValue == '') {

                // =======================
                if (add_order_product_btn) {
                    // проверяем наличие div c id=btn_show_warning_2
                    if (window.document.getElementById('btn_show_warning_2')) {
                        window.document.getElementById('btn_show_warning_2').remove();
                    }
                    add_order_product_btn.insertAdjacentHTML(
                        'beforebegin',
                        '<div id="btn_show_warning_2">Перед добавлением товара необходимо выбрать <a href="#intaro_crmbundle_ordertype_deliveryType">Тип доставки</a> и <a href="#intaro_crmbundle_ordertype_deliveryAddress_region">Адрес доставки</a></div>');
                }
                // =======================

                btn_show_warning_2.style.display = 'block';
                add_order_product_btn.style.display = 'none';

            } else {

                add_order_product_btn.style.display = 'block'; // показываем стандартную кнопку
                btn_show_warning_2.style.display = 'none';     // скрываем заглушку

                // if (valueSelect2 == 2) {
                //     document.getElementById('intaro_crmbundle_ordertype_shipmentStore').value = "7";
                //     document.getElementById('intaro_crmbundle_ordertype_customFields_sklad_otgruzki').value = "674";
                // } else if (valueSelect2 == 64) {
                //     document.getElementById('intaro_crmbundle_ordertype_shipmentStore').value = "6";
                //     document.getElementById('intaro_crmbundle_ordertype_customFields_sklad_otgruzki').value = "675";
                // } else {
                //     document.getElementById('intaro_crmbundle_ordertype_shipmentStore').value = '';
                //     document.getElementById('intaro_crmbundle_ordertype_customFields_sklad_otgruzki').value = '';
                // }
            }

        } else {

            // =======================
            if (add_order_product_btn) {
                // проверяем наличие div c id=btn_show_warning_2
                if (window.document.getElementById('btn_show_warning_2')) {
                    window.document.getElementById('btn_show_warning_2').remove();
                }
                add_order_product_btn.insertAdjacentHTML(
                    'beforebegin',
                    '<div id="btn_show_warning_2">Перед добавлением товара необходимо выбрать <a href="#intaro_crmbundle_ordertype_deliveryType">Тип доставки</a> и <a href="#intaro_crmbundle_ordertype_deliveryAddress_region">Адрес (при доставке)</a></div>');
            }
            // =======================

            btn_show_warning_2.style.display = 'block';
            add_order_product_btn.style.display = 'none';
            //initScript();
        }
    } else {

        // =======================
        if (add_order_product_btn) {
            // проверяем наличие div c id=btn_show_warning_2
            if (window.document.getElementById('btn_show_warning_2')) {
                window.document.getElementById('btn_show_warning_2').remove();
            }
            add_order_product_btn.insertAdjacentHTML(
                'beforebegin',
                '<div id="btn_show_warning_2">Перед добавлением товара необходимо выбрать <a href="#intaro_crmbundle_ordertype_site">Магазин</a></div>');
        }
        // =======================

        btn_show_warning_2.style.display = 'block';
        add_order_product_btn.style.display = 'none';
    }

}

// function initBtnSaveOrder() {
//     // событие при клике на применить
//     var btn_save_address_order = window.document.getElementById("btn_save_address_order");
//     btn_save_address_order.addEventListener('click', function () {

//         console.log('Клик - по кнопке Применить');

//         var btn_btn_save = window.document.querySelector('.btn.small.btn-save');
//         btn_btn_save.addEventListener('click', function () {
//             console.log('Клик - по кнопке сохранить заказ');
//         }, false);

//         if (window.document.getElementById('btn_save_address_order')) {
//             window.document.getElementById('btn_save_address_order').remove();
//         }
        
//     }, false);
// }

function getRetailCRMApiKey() {
	fetch('https://xn--80abwmlfh7b4c.xn--p1ai/integrations/extension_stocks/moysklad_request_new.php?request=true&site=' + host)
        .then(response => response.json())
	    .then(result => {
        console.log(result.apiKey);
        retailCRM_apiKey = result.apiKey, localStorage.setItem('apiKey', result.apiKey);
        console.log('Probahili Extension loaded with API key')
	})	
}

// проверяем объект на пустоту
function isEmpty(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}

