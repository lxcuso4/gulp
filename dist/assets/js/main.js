/**
 * 
 * Created by LX on 2016/9/30.
 */
function log() {
    var liu = 1,
        xing =2;
    console.log(liu,xing);
    window.console.log.apply(console,arguments);
}
function hi() {
    var liu = 1;
    var xing =2;
}
var looooooongTitle={
    name:'liux',
    say:function () {
        log('hi'+this.name);
    }
};
var string='xing';
log();
looooooongTitle.name= string;

/**
 *
 * Created by LX on 2016/9/30.
 */

looooooongTitle.say();
