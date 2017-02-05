import { PrimengPostgrestPage } from './app.po';

describe('primeng-postgrest App', function() {
  let page: PrimengPostgrestPage;

  beforeEach(() => {
    page = new PrimengPostgrestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
