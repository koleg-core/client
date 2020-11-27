import { ApiEndpoints } from 'src/app/enums/api-endpoints.enum';
import { Job } from 'src/app/models/job';
import { AbstractRequest, RequestParameters } from '../abstract.request';
import { ProtocolInterface } from '../protocol-interface';

export class PostJobRequest extends AbstractRequest implements ProtocolInterface {

  constructor(
    private job: Job
  ) {
    super();
  }

  send(): Promise<any> {
    const parameters: RequestParameters = {
      endpoints: ApiEndpoints.JOBS,
      body: this.getBody()
    };

    return this.doPost(parameters);
  }

  getBody(): FormData {
    // TODO: make body with job
    return new FormData();
  }
}
