import { ApiEndpoints } from 'src/app/enums/api-endpoints.enum';
import { Job } from 'src/app/models/job';
import { AbstractRequest, RequestParameters } from '../abstract.request';
import { ProtocolInterface } from '../protocol-interface';

export class GetJobRequest extends AbstractRequest implements ProtocolInterface {

  constructor(
    private jobId: string
  ) {
    super();
  }

  send(): Promise<Job> {
    const parameters: RequestParameters = {
      endpoints: ApiEndpoints.JOBS + '/' + this.jobId,
      body: this.getBody()
    };

    return this.doGet(parameters);
  }

  getBody(): FormData {
    return new FormData();
  }
}
