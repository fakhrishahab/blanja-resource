import $ from 'jquery';

var utils = module.exports = {
  formatMoney: function(moeny){
    var result=parseInt(moeny);
    if(isNaN(result)){
      return "0";
    }
    
    result=(result+"").split("").reverse().join("");
      var str2 = "";
      var len=result.length;
      for(var i=0;i<len;i++){
          if(i*3+3>len){
              str2 += result.substring(i*3, len);
              break;
          }
          str2 += result.substring(i*3, i*3+3)+".";
      }
      if(utils.endsWith(str2,".")){
          str2 = str2.substring(0, str2.length-1);
      }
      
      
      return str2.split("").reverse().join("");
  },
  endsWith: function(thisString,str){
    var thisLen=thisString.length;
    var strLen=str.length;
    if(str==null||str==""||thisLen==0||strLen>thisLen){
      return false;
    }
    if(thisString.substring(thisLen-strLen)==str){
      return true;
    }else{
      return false;
    }
    return true;
  }
  // function htmlDecode(str)  
  // {  
  //         var    s    =    "";  
  //         if    (str.length    ==    0)    return    "";  
  //         s    =    str.replace(/&amp;/g,    "&");  
          
  //         s    =    s.replace(/&lt;/g,        "<");  
  //         s    =    s.replace(/&gt;/g,        ">");  
  //         s    =    s.replace(/&nbsp;/g,        "    ");  
  //         s    =    s.replace(/&quot;/g,      "\"");  
  //         s    =    s.replace(/&#39;/g,      "\'");  
  //         s    =    s.replace(/&apos;/g,      "\'"); 
  //         s    =    s.replace(/&plusmn;/g,      "±"); 
  //         s    =    s.replace(/&ldquo;/g,      "“"); 
  //         s	=    s.replace(/&rdquo;/g,    "”");
  //         s    =    s.replace(/&lsquo;/g,      "‘"); 
  //         s    =    s.replace(/&rsquo;/g,      "’"); 
  //         return    s;  
  // }   


  // //格式化为印尼货币格式
  // function formatMoney(moeny){
  // var result=parseInt(moeny);
  // if(isNaN(result)){
  //   return "0";
  // }
  
  // result=(result+"").split("").reverse().join("");
  //   var str2 = "";
  //   var len=result.length;
  //   for(var i=0;i<len;i++){
  //       if(i*3+3>len){
  //           str2 += result.substring(i*3, len);
  //           break;
  //       }
  //       str2 += result.substring(i*3, i*3+3)+".";
  //   }
  //   if(endsWith(str2,".")){
  //       str2 = str2.substring(0, str2.length-1);
  //   }
    
    
  //   return str2.split("").reverse().join("");
  // }
    

  // /**
  // * 判断thisString字符串是否以str结束
  // * @param thisString
  // * @param str
  // * @returns {Boolean}
  // */
  // function endsWith(thisString,str){
  // var thisLen=thisString.length;
  // var strLen=str.length;
  // if(str==null||str==""||thisLen==0||strLen>thisLen){
  //   return false;
  // }
  // if(thisString.substring(thisLen-strLen)==str){
  //   return true;
  // }else{
  //   return false;
  // }
  // return true;
  // }
  
    
  // //格式化日期为印尼日期 
  // //showType控制显示格式
  // //1.返回dd/MM/yyyy  2.返回dd/MM/yyyy hh WIB 3.返回dd/MM/yyyy hh:mm WIB 4.返回dd/MM/yyyy hh:mm:ss WIB
  // //showType为null或""显示 dd/MM/yyyy格式
  // function formatLastLoginTime(val,showType) {
  //   if (val == null || val == "" ) {
  //     return "&nbsp;";
  //   } else {
      
  //     if(typeof(val) === "string")
  //       val = val.replace(/\-/g,'\/').replace(/[T|Z]/g,' ');
      
  //     var a = new Date(val);
  //     // HARD CODE WIB's timezone offset.
  //     var WIB_OFFSET = -420;
  //     a.setMinutes(a.getMinutes() + a.getTimezoneOffset());
  //     a.setMinutes(a.getMinutes() - WIB_OFFSET);
      
  //     var date=a.getDate();
  //     if((a.getDate()+"").length<2){
  //       date="0"+a.getDate();
  //     }
  //     var mon=a.getMonth() + 1;
  //     if(((a.getMonth() + 1)+"").length<2){
  //       mon="0"+(a.getMonth() + 1);
  //     }
  //     var year=a.getFullYear();
  //     if((a.getFullYear()+"").length<2){
  //       year="0"+a.getFullYear();
  //     }
  //     var hh=a.getHours(); 
  //     if((a.getHours()+"").length<2){
  //     hh="0"+ a.getHours(); 
  //     }
  //     var mm=a.getMinutes();
  //     if((a.getMinutes()+"").length<2){
  //       mm="0"+a.getMinutes(); 
  //     }
  //     var ss= a.getSeconds();
  //     if((a.getSeconds()+"").length<2){
  //     ss="0"+ a.getSeconds();
  //     }
      
  //     if("1" == showType){
  //     return  date+ "/" + mon+ "/" +year ;
  //     }else if("2" == showType){
  //     return  date+ "/" + mon+ "/" +year + " " + hh+  " WIB";
  //     }else if("3" == showType){
  //     return  date+ "/" + mon+ "/" +year + " " + hh+ ":" + mm+  " WIB";
  //     }else if("4" == showType){
  //     return  date+ "/" + mon+ "/" +year + " " + hh+ ":" + mm+ ":" + ss+  " WIB";
  //     }else{
  //     return  date+ "/" + mon+ "/" +year ;
  //     }
  //   }
  // }


  // // 印尼日期格式 精确到天
  // function formatWIBTimeByDay(val) {
  // return formatLastLoginTime(val, 1);
  // }

  // // 印尼日期格式 精确到小时
  // function formatWIBTimeByHour(val) {
  // return formatLastLoginTime(val, 2);
  // }

  // // 印尼日期格式 精确到分钟
  // function formatWIBTimeByMinnute(val) {
  // return formatLastLoginTime(val, 3);
  // }

  // //印尼日期格式 精确到秒
  // function formatWIBTimeBySecond(val) {
  // return formatLastLoginTime(val, 4);
  // }

  // Number.prototype.formatMoney = function(c, d, t){
  // var n = this, 
  //     c = isNaN(c = Math.abs(c)) ? 2 : c, 
  //     d = d == undefined ? "." : d, 
  //     t = t == undefined ? "," : t, 
  //     s = n < 0 ? "-" : "", 
  //     i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
  //     j = (j = i.length) > 3 ? j % 3 : 0;
      
  // return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  // };

  // function decodeHtml(text) {
  // if(text != undefined)
  // return $('<div/>').html(text).text();	
  // }


  // $(document).ready(function() {
  // if(typeof Handlebars !== "undefined") {
  //   Handlebars.registerHelper('ifCond', function(v1, v2, options) {
  //     if(v1 === v2) {
  //       return options.fn(this);
  //     }
  //     return options.inverse(this);
  //   });
    
    
  //   Handlebars.registerHelper('ifCond2', function(v1, operator, v2, options) {
  //     switch (operator) {
  //           case '==':
  //               return (v1 == v2) ? options.fn(this) : options.inverse(this);
  //           case '===':
  //               return (v1 === v2) ? options.fn(this) : options.inverse(this);
  //           case '<':
  //               return (v1 < v2) ? options.fn(this) : options.inverse(this);
  //           case '<=':
  //               return (v1 <= v2) ? options.fn(this) : options.inverse(this);
  //           case '>':
  //               return (v1 > v2) ? options.fn(this) : options.inverse(this);
  //           case '>=':
  //               return (v1 >= v2) ? options.fn(this) : options.inverse(this);
  //           case '&&':
  //               return (v1 && v2) ? options.fn(this) : options.inverse(this);
  //           case '||':
  //               return (v1 || v2) ? options.fn(this) : options.inverse(this);
  //           default:
  //               return options.inverse(this);
  //       }
      
  //   });
    
    
  //   Handlebars.registerHelper('ifMessageTimeEqualPrevMsg', function(array, options) {
      
  //     if(options){
  //       if(options.data){
          
  //         if(options.data.first){					
  //           return options.inverse(this);
  //         } else {
            
  //           var currData = array[options.data.index];
  //           var prevData = array[options.data.index - 1];
            
  //           if(currData['dateTime'] && prevData['dateTime']){
              
  //             var currDate = new Date(currData['dateTime']);
  //             var prevDate = new Date(prevData['dateTime']);
              
  //             if(currDate && prevDate){
                
  //               if(currDate.getDate()===prevDate.getDate() && currDate.getMonth()===prevDate.getMonth() && currDate.getFullYear()===prevDate.getFullYear())
  //                 return options.fn(this);								
  //             }
  //           }
  //         }
  //       }
  //     }
      
  //     return options.inverse(this);
      
  //   });
  // };


  // var Validators = {
  //   addressValidator: function(address){
      
  //   }
  // }

  // if(!('contains' in String.prototype)){
  //   String.prototype.contains = function(str, index){
  //     return -1 !== String.prototype.indexOf.call(this, str, index);
  //   }
  // }

  // String.prototype.stringShorten = function(len){

  //   var start = 0;
  //   var end = this.length;
  //   if(len > 8){
  //     start = len - 8;
  //   }
  //   if(this.length > (len + 8)){
  //     end = len + 8;
  //   }
  //   var subString = this.slice(start, end);
  //   var newPosition = len;
  //   //如果包含html entity（虽然这两个条件）
  //   var result = this.slice(0, start);
    
  //   if(subString.contains("&#") && subString.contains(";")){
  //     if(subString.lastIndexOf("&#") < subString.lastIndexOf(";")){
  //       // 如果掉在两个html entities之间，少取
  //       result = result + subString.slice(start, subString.indexOf(";") + 1);
  //     }else{
  //       // 如果掉在一个html entity之间，多取
  //       result = result + subString.slice(start, subString.lastIndexOf(";") + 1);
  //     }
  //     if(result.length < this.length){
  //       result = result + "...";
  //     }
  //     return result;
  //   }
  //   var new_string = null;
  //       if(this.length>len){
  //         new_string = this.slice(0,len)+'...';
  //       }else{
  //           new_string = this;
  //       }
  //       return new_string;
  // };
  // });

  // function decodeHtmlEntity(html) {
  //   var txt = document.createElement("textarea");
  //   txt.innerHTML = html;
  //   return txt.value;
  // }


  // function scrollToBottom(classOrId){	
  //   var component = $(classOrId);
  //   if(component){
  //     if(component[0]) {
  //       var height = component[0].scrollHeight;
  //       component.scrollTop(height);
  //     }
  //   }

  // }
}