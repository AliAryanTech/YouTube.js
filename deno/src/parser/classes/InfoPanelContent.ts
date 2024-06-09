import { YTNode } from '../helpers.ts';
import type { RawNode } from '../index.ts';
import type { AttributedText } from './misc/Text.ts';
import Text from './misc/Text.ts';
import Thumbnail from './misc/Thumbnail.ts';
import NavigationEndpoint from './NavigationEndpoint.ts';

export default class InfoPanelContent extends YTNode {
  static type = 'InfoPanelContent';

  title: Text;
  source: Text;
  attributed_paragraphs: Text[];
  thumbnail: Thumbnail[];
  source_endpoint: NavigationEndpoint;
  truncate_paragraphs: boolean;
  background: string;
  inline_link_icon_type?: string;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.source = new Text(data.source);
    this.attributed_paragraphs = data.attributedParagraphs.map((p: AttributedText) => Text.fromAttributed(p));
    this.thumbnail = Thumbnail.fromResponse(data.thumbnail);
    this.source_endpoint = new NavigationEndpoint(data.sourceEndpoint);
    this.truncate_paragraphs = !!data.truncateParagraphs;
    this.background = data.background;

    if (Reflect.has(data, 'inlineLinkIcon') && Reflect.has(data.inlineLinkIcon, 'iconType')) {
      this.inline_link_icon_type = data.inlineLinkIcon.iconType;
    }
  }
}