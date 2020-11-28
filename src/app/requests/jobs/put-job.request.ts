import { ApiEndpoints } from 'src/app/enums/api-endpoints.enum';
import { Job } from 'src/app/models/job';
import { AbstractRequest, RequestParameters } from '../abstract.request';
import { ProtocolInterface } from '../protocol-interface';

export class PutJobRequest extends AbstractRequest implements ProtocolInterface {

  constructor(
    private job: Job
  ) {
    super();
  }

  send(): Promise<Job> {
    const parameters: RequestParameters = {
      endpoints: ApiEndpoints.JOBS + '/' + this.job.id,
      body: this.getBody()
    };

    return this.doPut(parameters);
  }

  getBody(): FormData {
    // TODO: make body with job
    return new FormData();
  }
}
