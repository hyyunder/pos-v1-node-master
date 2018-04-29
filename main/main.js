'use strict';
const datebase= require('../main/datbase');

function printInventory(inputs) {
    var items=datebase.loadAllItems();
    var cheap=datebase.loadPromotions();
    var numbers = [];
    var result = '***<没钱赚商店>购物清单***\n';;
    var moneys=0;
    var save=0;
    /*
    for(var j=0;j<inputs.length;j++)
    {
        if(numbers.length==0){
            var num = 0;
            for (var i = 0; i < inputs.length; i++)
                if (inputs[j] == inputs[i]) {
                    num++;
                }
            numbers.push({item: inputs[j], number: num});
        }else {
            //console.log(1);
            var n = 0;
            for (var m = 0; m < numbers.length; m++) {
                if (numbers[m].item == inputs[j])
                    n = 1;
            }
            if (n == 0) {
                var num = 0;
                for (var i = 0; i < inputs.length; i++)
                    if (inputs[j] == inputs[i])
                        num++;
                if(inputs[j].indexOf('-')==-1) {
                    //console.log(inputs[j],"  ",num);
                    numbers.push({item: inputs[j], number: num});
                }else{
                    //console.log(inputs[j],"--",num);
                    numbers.push({item: inputs[j].split('-')[0], number: Number(inputs[j].split('-')[1])});
                }
            }
        }
    }
    */
    inputs.forEach(a=>{
        if(numbers.length==0)
        {
            let num=0;
            inputs.forEach(b=>{
                if(a==b)    num++;
            })
            numbers.push({item: a, number: num});
        }else{
            let n=0;
            numbers.forEach(m=>{
                if(m.item==a) n=1;
            })
            if(n==0)
            {
                let num=0;
                inputs.forEach(b=>{
                    if(a==b)    num++;
                })
                if(a.indexOf('-')==-1) {
                    //console.log(inputs[j],"  ",num);
                    numbers.push({item: a, number: num});
                }else{
                    //console.log(inputs[j],"--",num);
                    numbers.push({item: a.split('-')[0], number: Number(a.split('-')[1])});
                }
            }
        }
    })

    /*
    for(var i=0;i<numbers.length;i++)
    {
        for(var j=0;j<items.length;j++)
        {
            if(numbers[i].item==items[j].barcode){
                var money=items[j].price * (numbers[i].number);
                if(cheap[0].barcodes.indexOf(numbers[i].item))
                    if(numbers[i].number>2) {
                        money = items[j].price * (numbers[i].number - 1);
                        save+=items[j].price;
                    }
                result+="名称："+items[j].name+"，数量："+numbers[i].number+items[j].unit+"，单价："+items[j].price.toFixed(2)+"(元)，小计："+money.toFixed(2)+"(元)\n";
                moneys+=money;
            }
        }
    }
    */
    numbers.forEach(a=>{
        items.forEach(b=>{
            if(a.item==b.barcode){
                let money=b.price * (a.number);
                if(cheap[0].barcodes.indexOf(a.item))
                    if(a.number>2) {
                        money = b.price * (a.number - 1);
                        save+=b.price;
                    }
                result+="名称："+b.name+"，数量："+a.number+b.unit+"，单价："+b.price.toFixed(2)+"(元)，小计："+money.toFixed(2)+"(元)\n";
                moneys+=money;
            }
        })
    })
    result+=
        '----------------------\n' +
        '挥泪赠送商品：\n' +
        '名称：雪碧，数量：1瓶\n' +
        '名称：方便面，数量：1袋\n' +
        '----------------------\n' +
        '总计：'+moneys.toFixed(2)+'(元)\n' +
        '节省：'+save.toFixed(2)+'(元)\n' +
        '**********************';
    //console.log(numbers);
    //console.log(result);
    console.log( result);
};

module.exports =  printInventory;