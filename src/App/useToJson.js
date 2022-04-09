/**转化生成json */
import { ref } from "vue";
import test from "./test.json";

export default function () {
    const jsonValue = ref(JSON.stringify(test, null, 2));
    return {
        jsonValue
    }
}