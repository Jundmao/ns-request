# dx-request

``js
import { request, get, post, postJson } from 'ns-request'
``

## apis

### request
* config: {
  returnResponse: false // 是否定制响应处理逻辑
}

### get
* url: string, required
* params: Object
* config: Object

### post
* url: string, required
* data: Object
* config: Object

### postJson（ContentType: application/json）
* url: string, required
* data: Object
* config: Object