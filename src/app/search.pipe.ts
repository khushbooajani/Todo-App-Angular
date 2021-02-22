import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'searchFilter'
})
export class SearchPipe implements PipeTransform{
    transform(value: any, filterString: string, propName: string):any{
        if(value.length === 0 || filterString === ''){
            return value;
        }
        const result = []
        for(const item of value){
            if(item[propName] === filterString){
                result.push(item)
            }
        }
        return result;
    }
}