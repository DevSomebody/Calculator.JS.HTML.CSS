const result = document.querySelector('#result');
const numbers = document.querySelectorAll('.number');
const functions = document.querySelectorAll('.function_key');
const additional_functions = document.querySelectorAll('.af_function');

let total = 0;
let lastCommand;
let VFlag = false, CosFlag = false, SinFlag = false, TgFlag = false, LnFlag = false, LgFlag = false;


for ( let i=0; i < numbers.length; i++ ){
    numbers[i].addEventListener('click',  function(){
        if (result.textContent == '0' && this.textContent != '.') result.textContent = '';
        if (this.textContent == '.' && result.textContent.indexOf('.') == -1) result.textContent += this.textContent;
        if (this.textContent != '.') result.textContent += this.textContent;
    });
}

for ( let i=0; i < functions.length; i++ ){
    functions[i].addEventListener('click', function(){
        let value = this.textContent;
        let number;

        if(VFlag == true) {
            number = result.textContent;
            number = Math.sqrt(Number(String(number.substring(1,String(number).length))));
            VFlag = false;
        } else if (CosFlag == true){
            number = result.textContent;
            number = Math.cos(Number(String(number.substring(4,String(number).length))));
            CosFlag = false;
        } else if (SinFlag == true){
            number = result.textContent;
            number = Math.sin(Number(String(number.substring(4,String(number).length))));
            SinFlag = false;
        }else if (TgFlag == true){
            number = result.textContent;
            number = Math.tg(Number(String(number.substring(3,String(number).length))));
            TgFlag = false;
        }else if(LnFlag == true){
            number = result.textContent;
            number = Math.log(Number(String(number.substring(2,String(number).length))));
            LnFlag = false;
        }else if(LgFlag == true){
            number = result.textContent;
            number = Math.log10(Number(String(number.substring(2,String(number).length))));
            LgFlag = false; 
        }else number = Number(result.textContent);

        switch(value){
            case 'AC':
                VFlag = false;
                result.textContent = '0';
                lastCommand = '';
                total = 0;
            break;

            case 'BS':
                result.textContent = result.textContent.substring(0, result.textContent.length - 1);
                if (result.textContent == '') result.textContent = 0;
            break;

            case '%':
                result.textContent = String(number/100);
            break;
                
            case '=':
                switch(lastCommand){
                    case '':
                        total = number;
                    break;
            
                    case '+':
                        total += number;
                    break;

                    case '-':
                        total -= number;
                    break;

                    case 'X':
                        total *= number;
                    break;

                    case '/':
                        total /= number;
                    break;

                    case '1/x':
                        total = Math.pow(total,(-1)*number);
                    break;

                    case '^':
                        total = Math.pow(total,number);
                    break;
                }
                result.textContent = total;
                total = 0;
            break;

            case '+':
                keyFunction(value,number);
            break;

            case '-':
                if (number == 0) result.textContent = '-';
                else keyFunction(value,number);
            break;

            case 'X':
                keyFunction(value,number);
            break;

            case '/':
                keyFunction(value,number);
            break;

            case 'AF':
                for ( let i = 0; i < additional_functions.length; i++ ){
                    if(!additional_functions[i].classList.contains('visible')){
                        additional_functions[i].classList.add('visible');
                        additional_functions[i].classList.remove('hidden');
                    } else if(additional_functions[i].classList.contains('visible')){
                        additional_functions[i].classList.add('hidden');
                        additional_functions[i].classList.remove('visible');
                        setTimeout(function(){
                            additional_functions[i].classList.remove('hidden');
                        },401);
                    }
                }
            break;


            case 'e':
                result.textContent = String(Math.E);
            break;

            case 'π':
                result.textContent = String(Math.PI);
            break;

            case '^':
                keyFunction(value,number);
            break;

            case '1/x':
                keyFunction(value,number);
            break;


            case '√':
                result.textContent = '√';
                lastCommand = '';
                VFlag = true;
            break;


            case 'cos':
                result.textContent = 'cos(';
                lastCommand = '';
                CosFlag = true;
            break;

            case 'sin':
                result.textContent = 'sin(';
                lastCommand = '';
                SinFlag = true;
            break;

            case 'tg':
                result.textContent = 'tg(';
                lastCommand = '';
                TgFlag = true;
            break;

            case 'ln':
                result.textContent = 'ln';
                lastCommand = '';
                LnFlag = true;
            break;

            case 'lg':
                result.textContent = 'lg';
                lastCommand = '';
                LgFlag = true;
            break;
        }
    });
}


const keyFunction = (value,number) => {
    lastCommand = value;
    total = number;
    result.textContent = 0;
}

