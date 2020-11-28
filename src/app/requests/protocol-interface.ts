export interface ProtocolInterface {

  /**
   * Send request.
   * Return a promise which contains request response.
   */
  send(): Promise<any>;

  /**
   * Get request body.
   * Return new instance of FormData if request doesn't require body.
   */
  getBody(): FormData;
}
