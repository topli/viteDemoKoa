var mosca = require('mosca');
//构建自带服务器
var MqttServer = new mosca.Server({
  http: {
    port: 9000,
    bundle: true,
    static: './'
  }
});
//对服务器端口进行配置， 在此端口进行监听
MqttServer.on('clientConnected', function(client) {
    //监听连接
    console.log('client connected', client.id);
});
/**
 * 监听MQTT主题消息
 **/
MqttServer.on('published', function(packet, client) {
    //当客户端有连接发布主题消息
    var topic = packet.topic;
    // console.log(packet);
    switch (topic) {
        case 'test':
            console.log('message-publish', packet.payload.toString());
            //MQTT转发主题消息
            //MqttServer.publish({ topic: 'other', payload: 'sssss' });
            break;
        case 'other':
            console.log('message-123', packet.payload.toString());
            break;
  }
  
});

MqttServer.on('ready', function() {
    //当服务开启时
    console.log('mqtt is running...');
});

module.exports = MqttServer