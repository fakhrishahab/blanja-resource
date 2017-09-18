import $ from 'jquery';
import ko from '../../commons/knockout/knockout-3.4.1';
import '../../commons/knockout/knockout-helper';
import '../../commons/knockout/extended-knockout';
import utils from '../../commons/utility/utils';

var _getDataName = function(){
	
}

function _getDataName() {
	
}

function checkFormatMoney(data){
	if(isNaN(data)){
		return data;
	} else {
		return utils.formatMoney(data);
	}
}

$(document).ready(function(){

  var baseUrl = 'http://localhost:8088';
  var httpsTradeUrl = 'http://localhost:8087';
	
	var axis = ["0838", "0831", "0832", "0833", "0834", "0835", "0836", "0837", "0839"];
	var smartfren = ["0888", "0889", "0887", "0886", "0885", "0884", "0883", "0882", "0881",
                 	 "0881", "0882", "0889", "0883", "0884", "0885", "0886", "0887", "0888"];
	var simpati = ["0812", "0811", "0813", "0821", "0822"];
	var as = ["0852", "0823", "0853", "0851"];
	var xl = ["0817", "0818", "0819", "0878", "0877", "0859"];
	var three = ["0895", "0896", "0897", "0898", "0899"];
	var mentari = ["0814", "0815", "0816", "0858"];
	var im3 = ["0856", "0857"];
  var bolt = ["998", "999"];

  function viewModel() {
    
    var self = this;
    
    var namePulsa = "pulsa";
    var nameData = "paket_data";
    var payMethod;
    
    self._getDataName = function (type, operatorName) {
      
      var opName = operatorName;

      if(!opName) {
        opName = "NA";
      }
      
      var dataName = type.toUpperCase() + '_' + opName.toUpperCase();
      
        return dataName;
    }
    
      self._state = "firstLoad";
      
      self._phoneNumberPulsaTarget = ko.observable();
      self._phoneNumberDataTarget = ko.observable();
      self.phoneNumberPulsa = function(allBindings, event) {
        var target = event.target;
        var value = target.value;
        var name = 'pulsa';
        self._phoneNumberPulsaTarget(target);
        
        if(!target.hasAttribute('tag')) {
          target.setAttribute('tag', name);
        }

        if(value) {
          value = self.eliminateRegionCode(value, "62");
          self.numberPulsa(value);
        }
        
        if (value && value.length < 4){
          self._resetState(namePulsa);
        } else if(value && value.length >= 4 ){
          var prefix = value.substring(0,4);
          
          if(!self.startWith(prefix,"0") && bolt.indexOf(prefix.substring(0,3)) <= -1) {
            value = "0" + value;
            prefix = value.substring(0,4);
            self.numberPulsa(value);
          }
          
          if(self._state != name+prefix) {
            var opName = self.findOperatorName(prefix);
            self.operatorNamePulsa(opName);
            self.reloadNominal(name);
            self._state = name+prefix;
          }
          
          self.showOperatorLogoPulsa(self.operatorNamePulsa() !== "");

        } 
          
        return true;
      };
      
      self.phoneNumberData = function(allBindings, event) {
        var target = event.target;
        var value = target.value;
        self._phoneNumberDataTarget(target);
        var name = 'paket_data';
        
        if(!target.hasAttribute('tag')) {
          target.setAttribute('tag', name);
        }
        
        if(value) {
          value = self.eliminateRegionCode(value, "62");
          self.numberData(value);
        }
        
        if (value && value.length < 4){
          self._resetState(nameData);
        } else if(value && value.length >= 4){
          var prefix = value.substring(0,4);
          
          if(!self.startWith(prefix,"0") && bolt.indexOf(prefix.substring(0,3)) <= -1) {
            value = "0" + value;
            prefix = value.substring(0,4);
            self.numberData(value);
          }
          
          if(self._state != name+prefix) {
            var opName = self.findOperatorName(prefix);
            self.operatorNameData(opName);		        	
            self.reloadNominal(name);
            self._state = name+prefix;
          }
          
          self.showOperatorLogoData(self.operatorNameData() !== "");
        }
        
        return true;
      };
      
      self.findOperatorName = function (prefix) {
        var opName = "";
        
        if(prefix == undefined){
          return opName;
        }
        
        if(prefix.length >= 4) {
          
          if(self.startWith(prefix,"0")){
              prefix = prefix.slice(0, 4);
          } else if(!self.startWith(prefix,"0") && bolt.indexOf(prefix.substring(0,3)) >= 0){
            prefix = prefix.slice(0, 3);
          } else {
            prefix = "0"+prefix.slice(0, 3);
          }
          
        }
        
        if($.inArray(prefix, axis) > -1) {
          opName = "axis";
        } else if($.inArray(prefix, smartfren) > -1) {
          opName = "smartfren";
        } else if($.inArray(prefix, simpati) > -1) {
          opName = "simpati";
        } else if($.inArray(prefix, as) > -1) {
          opName = "as";
        } else if($.inArray(prefix, xl) > -1) {
          opName = "xl";
        } else if($.inArray(prefix, three) > -1) {
          opName = "three";
        } else if($.inArray(prefix, mentari) > -1) {
          opName = "mentari";
        } else if($.inArray(prefix, im3) > -1) {
          opName = "im3";
        } else if($.inArray(prefix, bolt) > -1) {
          opName = "bolt";
        }
        
        return opName;
      };
      
      self.startWith = function(value, prefix){
      
    if(value && prefix) {
      
      if(value.indexOf(prefix) == 0) {
        return true;
      }
      
    }

  return false;

      }
      
      self.digitalAndVoucherTab = function(allBindings, event) {
        /*
        var tag;
        var firstLoad = false;
        var target = event !== undefined ? event.currentTarget : undefined;
        
        
        if(self._state === "firstLoad" || !target){
          tag = self.tabContainer();
          self._state = "";
          firstLoad = true;
        }
        console.log(tag);
        
        $(".tabs li").removeClass("active");

        if(!firstLoad) {
          var target = event.currentTarget;
            tag = target.getAttribute("tag");

            if(target.classList.contains("active")) {
              target.classList.remove("active");
            }
            target.classList.add("active");
        } else {
          $(".tabs li[tag="+tag+"]").addClass("active");
        }
        
        self.tabContainer(tag);*/
      self._state = "";
      self.tabContainer(event.currentTarget.getAttribute("tag"));
      };
      
      self.validateInput = function(phoneNumber, sku, type){
        
        var isValid = false;
        
        var opName = self.findOperatorName(phoneNumber);

        if(phoneNumber && sku && phoneNumber.length >= 10 && opName !== "" && sku !== undefined && sku !== "") {
          isValid = true;
          
          if(type === namePulsa || type === nameData){
            if(phoneNumber.length > 13){
              isValid = false;
            }
          }
        }
        return isValid;
      }
      
      
      self.confirm = function() {

        var virtualAddress, sku, item;
        var type = self._actionBuyType();
        var phoneNumber;
        
        if(self._actionBuyType() === namePulsa) {
          phoneNumber = self.numberPulsa();
          sku = self.selectedNominalPulsa();
          item = self.selectedItemPulsa();
          
        } else if(self._actionBuyType() === nameData) {
          phoneNumber = self.numberData();
          sku = self.selectedNominalData();
          item = self.selectedItemData();
        }
        
        if(self.isDesktop()){
          var errorshowfunc=function(errors){
            var msg = "";
                if(obj.length>1){
                  for (var i = 0; i < obj.length; i++) {
                      msg += (i + 1) + ". " + obj[i].message + "\n";
                  }
                }else{
                  msg=obj[0].message;
                }
                alert(decodeHtml(msg));
          };
          
          $.ajax({
                  type: "GET",
                  url: httpsTradeUrl + "/pulse/validatepulse",
                  data: {
                      phonenumber: phoneNumber,
                      nominal: sku,
                  },
                  traditional: true,
                  success: function(resp){
                    if(resp.length > 0) {
                      errorshowfunc(resp);
                      }else{
                        var currentURL=encodeURIComponent(window.location.href);
                        window.location=httpsTradeUrl+"/pulse/confirmpulse?referer="+currentURL+"&phoneNumber="+phoneNumber+"&" +
                            "itemId="+item+"&skuId="+sku;
                      } 
                  }
              });
        }else{
          if(phoneNumber && sku && item) {

              var form = $("<form method='POST' action='" + baseUrl + "/trade/order/confirm?id="+item+"'>" +
                  "<input type='hidden' name='sku' value='"+sku+"'>" +
                  "<input type='hidden' name='num' value='1'>" +
                  "<input type='hidden' name='virtualAddress' value='"+phoneNumber+"'>" +
              "<input type='hidden' name='virtualType' value='"+self._actionBuyType()+"'>" +
              "<input type='hidden' name='refPage' value='homepage'>" +
            "</form>");
              
              $(window.top.document.body).append(form);
              form.submit();
            } else {
              alert("Please input phone number and nominal");
            }
        }
      }
      
      self._actionBuyType = ko.observable(namePulsa);
      
      self.actionBuyPulsa = function(allBindings, event) {
        
        if(!self.inOutStock()) {
          return false;
        }
        
        var target = event.target;
        
        var phoneNumber = self.numberPulsa();
        var sku = self.selectedNominalPulsa();
        
        
          if (self.validateInput(phoneNumber, sku, namePulsa)) {
            payMethod = self.confirm();
            self._actionBuyType(namePulsa);
            
            if(self.isDesktop()){
              self.confirm();
            }else{
              var url = window.location.href + '?p='+phoneNumber+'&sku='+sku+'&type='+namePulsa;
                loginThenUrl("payMethod", url);
            }
          } else {
            alert("invalid input");
              return false;
          }
      };
      
      self.actionBuyDataPlan = function(allBindings, event) {
        
        if(!self.inOutStock()) {
          return false;
        }
        
        var target = event.target;
        
        var phoneNumber = self.numberData();
        var sku = self.selectedNominalData();
        
        if (self.validateInput(phoneNumber, sku, nameData)) {
            payMethod = self.confirm();
            self._actionBuyType(nameData);
            
            if(self.isDesktop()){
              self.confirm();
            }else{
                var url = window.location.href + '?p='+phoneNumber+'&sku='+sku+'&type='+nameData;
                loginThenUrl("payMethod", url);
            }
          } else {
            alert("invalid input");
              return false;
          }
        
      };
      
      self.findSupportedOperatorDetail = function(type, callback, targetData) {
        
        var phoneNumber;
        var url = baseUrl;
        if(type === namePulsa) {
          phoneNumber = self.numberPulsa();
        } else if (type === nameData) {
          phoneNumber = self.numberData();
        }
        
        if(phoneNumber && phoneNumber.length > 3) {
          $.ajax({
        type:"POST",
        url:baseUrl+"/digitalandvoucher/findSupportedOperatorDetail",
        data:{
          phonenumber:phoneNumber,
          type: type
        },
        dataType:"json",
        success:function(response){
          if(response.result === "SUCCESS") {
            
            if(response.data) {
              if(response.data.itemDigital) {
                //self._resetState(type);
                callback(response.data.itemDigital, targetData);
              }
            } else {
              self.inOutStock(false);
            }
          }
        },
        error:function(err){
          self._resetState(type);
        }
      });
        }
        
      };
      
      self.availableNominalPulsa = ko.observableArray();
      self.availableNominalData = ko.observableArray();
      self.operatorNamePulsa = ko.observable("");
      self.operatorNameData = ko.observable("");
      self.showOperatorLogoPulsa = ko.observable(false);
      self.showOperatorLogoData = ko.observable(false);
      self.numberPulsa = ko.observable();
      self.numberData = ko.observable();
      self.tabContainer = ko.observable();
      
      self.tabContainer.subscribe(function(tag){
        $(".tabs li").removeClass("active");
        $(".tabs li[tag="+tag+"]").addClass("active");
      });
      
      self.pricePulsa = ko.observable("-");
      self.priceData = ko.observable("-");
      self.normalPricePulsa = ko.observable("");
      self.normalPriceData = ko.observable("");
      self.selectedNominalPulsa = ko.observable();
      self.selectedItemPulsa = ko.observable();
      self.selectedNominalData = ko.observable();
      self.selectedItemData = ko.observable();
      self.removeDisabled = ko.observable(false);
      self.inOutStock = ko.observable(true);
      
      self.eliminateRegionCode = function(phoneNumber, regionCode) {
        
        if(!regionCode) {
          regionCode = "62";
        }
        
        if(phoneNumber && phoneNumber.length > 1 && self.startWith(phoneNumber, regionCode)) {
          phoneNumber = "0"+phoneNumber.slice(2,phoneNumber.length);
        }
        
        return phoneNumber;
      };
      
      self.reloadNominal = function(type) {

        var phoneNumber;
        
        if(type === namePulsa) {
          phoneNumber = self.numberPulsa();
        } else if (type === nameData) {
          phoneNumber = self.numberData();
        }
        
        self.getAvailableNominal(phoneNumber, type);  
      };
      
      self.getAvailableNominal = function(phoneNumber, type) {
        var target = undefined;
                  
        if(type === namePulsa) {
          target = self._phoneNumberPulsaTarget();        		
        } else if(type === nameData){
          target = self._phoneNumberDataTarget();
        }

        var operatorName = self.findOperatorName(phoneNumber);
        
        var dataName = self._getDataName(type, operatorName);
        
        var jData = $(target).data();
        
        if(jData[dataName]) {
          if(type === namePulsa) {
              self.availableNominalPulsa(jData[dataName]);
              self.removeDisabled(true);
              self.inOutStock(true);
          } else if(type === nameData){
            self.availableNominalData(jData[dataName]);
            self.removeDisabled(true);
              self.inOutStock(true);
          }
          
          //self._resetState(type);
        } else {
            self.findSupportedOperatorDetail(type, self.findSupportedOperatorDetail_success, $(target));            	
        }
      };
      
      self.findSupportedOperatorDetail_success = function(data, targetData) {
        
        if(data.length > 0){
          var jData = [];
          var dataName;
          
          for(var idx=0; idx<data.length; idx++){
            var nominal = data[idx].nominal;
            var operatorName = data[idx].phoneProviderName;
            var skuId = data[idx].skuId;
            var type = data[idx].type;
            var itemId = data[idx].itemId;
            var description=data[idx].description;
            
            var price = 0;
            
            var targetTag = $(targetData).attr('tag');

            if(!targetTag || targetTag.toUpperCase() !== type.toUpperCase()) {
              continue;
            }
            
            dataName = self._getDataName(type, operatorName);
            jData = $(targetData).data();
            
          if(!jData[dataName]) {
            jData[dataName] = new Array();
          }
          
          nominal = type.toUpperCase() === namePulsa.toUpperCase() ? checkFormatMoney(nominal) : nominal;
          
          var sku = itemId+"|"+skuId;
          
          var existingData = jData[dataName];
          var isExists = false;
          for(var j=0; j<existingData.length; j++){
            var currData = existingData[j];
            if(currData.sku === sku){
              isExists = true;
            }
          }
          
          if(!isExists) {
            jData[dataName].push( 
                          {
                    'nominal' : nominal,
                      'operatorName' : operatorName,
                      'sku' : sku,
                      'type' : type,
                      'price' : price,
                      'description':description
                          });
          }
          
                  
          }
          
      $(targetData).data(jData);
      if(targetTag.toUpperCase() === namePulsa.toUpperCase()) {
        self.availableNominalPulsa(jData[dataName]);
        self.removeDisabled(true);
        self.inOutStock(true);
      } else if(targetTag.toUpperCase() === nameData.toUpperCase()) {
        self.availableNominalData(jData[dataName]);
        self.removeDisabled(true);
        self.inOutStock(true);
      }
        } else {
          self.inOutStock(false);
        }
      };
      
      self.findPrice = function(type, item, sku, callback){
        
        $.ajax({
      type:"POST",
      url:baseUrl+"/digitalandvoucher/getSkuPrice",
      data:{
        item : item,
        sku : sku
      },
      dataType:"json",
      success:function(response){
        
        if(response.result === "SUCCESS") {
          
          if(response.data) {
            //self._resetState(type);
            callback(response.data, type);
          }
        }
      },
      error:function(err){
        self._resetState;
      }
    });
        
      };
      
      self.findPrice_success = function(data, type) {
        if(data) {
          
          var price;
          var normalPrice = "";
          
          if(data.limitDiscountPrice && data.limitDiscountPrice !== null) {
            price = data.limitDiscountPrice;
            if(data.price && data.price !== null && (data.limitDiscountPrice != data.price)) {
                normalPrice = "Rp " + utils.formatMoney(data.price);
              }
          } else {
            price = data.price;
          }
          
          price = "Rp " + utils.formatMoney(price);
          
          if(type.toUpperCase() === namePulsa.toUpperCase()){
              self.pricePulsa(""+price+"");
              self.normalPricePulsa(""+normalPrice+"");
          } else if(type.toUpperCase() === nameData.toUpperCase()){
              self.priceData(""+price+"");
              self.normalPriceData(""+normalPrice+"");
          }
          
          
        } 
      };
      
      self.selectedSkuPulsa = ko.observable() ;
      self.selectedSkuPulsa.subscribe(function(selectedItem){
        if(selectedItem) {
          var sku = selectedItem.split("|");
          self.selectedNominalPulsa(sku[1]);
          self.selectedItemPulsa(sku[0]);
          // console.log(self._phoneNumberPulsaTarget())
          var existingData = $(self._phoneNumberPulsaTarget()).data();
          
      for (var key in existingData) {
        if (!existingData.hasOwnProperty(key)) continue;
        
        var obj = existingData[key];
      }
          
            self.findPrice(namePulsa, sku[0], sku[1], self.findPrice_success);        		
        }
      });
      
      self.selectedSkuData = ko.observable() ;
      self.selectedSkuData.subscribe(function(selectedItem){
        if(selectedItem) {
          var sku = selectedItem.split("|");
          self.selectedNominalData(sku[1]);
          self.selectedItemData(sku[0]);
            self.findPrice(nameData, sku[0], sku[1], self.findPrice_success);        		
        }
      });
      
      self._resetState = function(type) {
        self._state = "";
        
        if(type.toUpperCase() === namePulsa.toUpperCase()) {
            self.availableNominalPulsa(new Array());
            self.pricePulsa("-");
            self.normalPricePulsa("");
            self.showOperatorLogoPulsa(false);
            self.choosedPulsaPackageDesc(null);
            self.removeDisabled(false);
            self.inOutStock(true);
        } else if(type.toUpperCase() === nameData.toUpperCase()) {
            self.priceData("-");
            self.normalPriceData("");
            self.availableNominalData(new Array());
            self.showOperatorLogoData(false);
            self.choosedDataPackageDesc(null);
            self.removeDisabled(false);
            self.inOutStock(true);
        }
        
        return true;
      };
      
      
      self.initialValue = function(){	
      
      if(self._state !== "firstLoad") {
        return false;
      }
      
        try{
            var currentUrl = new URL(location.href);
          var phoneNumber = currentUrl.searchParams.get("p");
          var sku = currentUrl.searchParams.get("sku");
          var type = currentUrl.searchParams.get("type");
          
          if(phoneNumber && phoneNumber !== "" && sku && sku !== "" && type && type !== "") {
              
            if(type.toUpperCase() === namePulsa.toUpperCase()) {
                self.numberPulsa(phoneNumber);
                self.tabContainer(namePulsa);
                
            } else if(type.toUpperCase() === nameData.toUpperCase()) {
              self.numberData(phoneNumber);
              self.tabContainer(nameData);
              
            }
          }
          
        }catch(err){
        }
      
    };
    
    self.device=ko.observable();
    
    self.isDesktop=function(){
      return 'DESKTOP'==self.device();
    };
    
    self.choosedPulsaPackageDesc=ko.observable(null);
    self.choosedDataPackageDesc=ko.observable(null);
    
    self.choosePackage = function(data,event,ispulsa){
      var dom=event.currentTarget;
      $(dom).addClass("nominal__list-item--is-active");
      $(dom).siblings().removeClass("nominal__list-item--is-active");
      
      if(data.description && data.description !== null) {
        data.description = data.description.replace(/(?:\r\n|\r|\n)/g, '<br />').replace(/(?:&lt;)/g,"<").replace(/(?:&gt;)/g,">").replace(/(?:&quot;)/g,"\"").replace(/(?:&#39;)/g,"\"");
      }
      
      if(ispulsa){
        self.choosedPulsaPackageDesc(data.description);
        self.selectedSkuPulsa(data.sku);
      }else{
        self.choosedDataPackageDesc(data.description);
        self.selectedSkuData(data.sku);
      }
      
    };
    
    self.dataCoupon=ko.observable(null);
    self.pulsaCoupon=ko.observable(null);
    
  }

  ko.applyBindings(new viewModel());
  
  /**
  * Get operator and provider from url to showing image operator
  */
 var pathname = window.location.pathname;
 var type = pathname.split('/')[2];
 var operator = pathname.split('/')[3];
 var provider = pathname.split('/')[4];
 
 var defaultProvider = {
     "tekomsel" : "simpati",
     "xl" : "xl",
     "tri" : "tri",
     "axis" : "axis",
     "indosat" : "im3-ooredoo",
     "bolt" : "bolt",
     "smartfren": "smartfren"
 }
 
 var aliasProvider = {
     "simpati":"simpati",
     "as":"as",
     "tri":"three",
     "mentari-ooredoo":"mentari",
     "im3-ooredoo":"im3",
     "matrix":"matrix",
     "axis":"axis",
     "smartfren":"smartfren",
     "bolt":"bolt",
     "xl" : "xl"
 }

 
 if ((operator != null || operator != undefined)
     && (provider == null || provider == undefined || provider == "")){
   provider = defaultProvider[operator];
 }
 var attr = $("#opLogo").attr('tag');
 if (type == "pulsa" && operator != undefined && operator != ""){
   //self.showOperatorLogoPulsa(true);
   if (typeof attr !== typeof undefined && attr !== false) {
     $("#opLogo").attr('tag', aliasProvider[provider]);
     }
 } else if (type == "paket-data" && operator != undefined && operator != "") {
   //self.showOperatorLogoData(true);
   if (typeof attr !== typeof undefined && attr !== false) {
     $("#opLogo").attr('tag', aliasProvider[provider]);
     }
 }
	
});