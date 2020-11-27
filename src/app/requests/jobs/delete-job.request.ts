import { ApiEndpoints } from 'src/app/enums/api-endpoints.enum';
import { AbstractRequest, RequestParameters } from '../abstract.request';
import { ProtocolInterface } from '../protocol-interface';

export class DeleteJobRequest extends AbstractRequest implements ProtocolInterface {

  constructor(
    private jobId: string
  ) {
    super();
  }

  send(): Promise<any> {
    const parameters: RequestParameters = {
      endpoints: ApiEndpoints.JOBS + '/' + this.jobId,
      body: this.getBody()
    };

    return this.doDelete(parameters);
  }

  getBody(): FormData {
    return new FormData();
  }
}
