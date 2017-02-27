
var city;

//获取城市名
  $.ajax({
    url: 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js',
    type: 'GET',
    dataType: 'text',
    data: {}
  })
  .done(function(data) {
    var cityObj=data.split(",")[5];
    city=cityObj.split(":")[1];
    city=unescape(city.replace(/\u/g, "%u"));
    city=city.split('\\').join("").split('"')[1];

//获取天气情况
      $.ajax({
              url: 'https://free-api.heweather.com/v5/forecast',
              type: 'GET',
              dataType: 'json',
              data: {
                  city: city,
                  key:"4ac0c5db753442719f2fdd9757634275",
              },
          })
          .done(function(data) {
              $('#city').text(data.HeWeather5[0].basic.city);
              $('#temperature').text(data.HeWeather5[0].daily_forecast[0].tmp.min+"~"+data.HeWeather5[0].daily_forecast[0].tmp.max+"℃");
              $('#day').text("白天："+data.HeWeather5[0].daily_forecast[0].cond.txt_d);
              $('#night').text("夜间："+data.HeWeather5[0].daily_forecast[0].cond.txt_n);
              $('#water').text("降水量："+data.HeWeather5[0].daily_forecast[0].pcpn+"mm");
              $('#humidity').text("相对湿度："+data.HeWeather5[0].daily_forecast[0].hum+"%");
              $('#wind').text("风力等级："+data.HeWeather5[0].daily_forecast[0].wind.sc);
              $('#see').text("能见度："+data.HeWeather5[0].daily_forecast[0].vis+"km");

              $('#day1').text(data.HeWeather5[0].daily_forecast[0].date);
              $('#temp1').text(data.HeWeather5[0].daily_forecast[0].tmp.max+"℃");

              $('#day2').text(data.HeWeather5[0].daily_forecast[1].date);
              $('#temp2').text(data.HeWeather5[0].daily_forecast[1].tmp.max+"℃");

              $('#day3').text(data.HeWeather5[0].daily_forecast[2].date);
              $('#temp3').text(data.HeWeather5[0].daily_forecast[2].tmp.max+"℃");

              $('#update-time').text("更新时间："+data.HeWeather5[0].basic.update.loc);

          })
          .fail(function() {
              console.log("error");

          })
          .always(function() {
          });
  })
  .fail(function(err) {
      console.log(err)
    $(".main-content").css("display","none")
    $(".no-content").css("display","block")
  })
  .always(function() {

  })
