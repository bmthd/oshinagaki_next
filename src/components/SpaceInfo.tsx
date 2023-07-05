import { Block, Circle, Day } from "@prisma/client";
import { TextLink } from "@/components/common";
import { SpaceQueryResult } from "@/services/eventService";

interface Space {
    id: string;
    spaceNumber: number;
    ab: string;
    genre: string;
    webcatalogUrl: string;
    block: Block;
    circle: Circle;
    day: Day;
  }
  
/**
 * スペース情報を表示するコンポーネント
 * 引数として1スペース分のデータを受け取る
 * 受け取った情報をもとにサークル情報を表示する
 * 
 * @param データベース上のスペースオブジェクト
 */
export const SpaceInfo = ({ space }: { space: SpaceQueryResult }) => {
    if(!space) return null;
    const circle = space.circle;
    if(!circle) return null;
    const block = space.block;
    const day = space.day;
    const circleName = circle.name ? (
        <TextLink href={`/circle/${circle.id}`} className="font-weight-bold whitespace-pre-wrap">
            {circle.name}
        </TextLink>
      ) : (
        <p>データなし</p>
      );
    const author = circle.author ? (
        <span>{circle.author}</span>
      ) : (
        <p>データなし</p>
      )
    const pixivUrl = circle.pixivUrl && (
        <TextLink 
            href={circle.pixivUrl}
            target="_blank"
            className="whitespace-pre-wrap"
        >
            {circle.pixivUrl}
        </TextLink>
      )
    const hpUrl = circle.hpUrl && (
            <TextLink
                href={circle.hpUrl}
                target="_blank"
                className="whitespace-pre-wrap"
            >
                ホームページ
            </TextLink>
            );
    const twitterId = circle?.twitterId ? circle?.twitterId : "";
    const twitterUrl = `https://twitter.com/${twitterId}`;
    const webcatalogUrl = space.webcatalogUrl;
    const spaceName = `${block?.name} ${space.spaceNumber}${space.ab}`;
    const spaceId = `${space.spaceNumber}${space.ab}`;
    const spaceNumber = space.spaceNumber;
    const spaceAb = space.ab;
    const spaceGenre = space.genre;
    const spaceWebcatalogUrl = space.webcatalogUrl;
    const title = `${day?.dayCount}日目 ${block?.name} ${space.spaceNumber}${space.ab}`;

    return (
        <ul
        className="row"
        style={{
          borderRadius: '5px',
          border: '3px dashed #6495ed',
          background: '#e0f0ff',
        }}
      >
        <li className="col-xs-12 col-md-6 col-lg-3">
          <h3 className="text-center" id={`${space.spaceNumber}${space.ab}`}>
            <span className="whitespace-pre-wrap">
              {title}
            </span>
          </h3>
  
          <h4>サークル名</h4>
            {circleName}
  
          <h4>執筆者名</h4>
            {author}
  
          <h4>Webサイト</h4>
          {space.webcatalogUrl && (
            <a
              href={space.webcatalogUrl}
              target="_blank"
              rel="noopener"
              style={{ whiteSpace: 'pre-wrap' }}
            >
              コミケWebカタログ
            </a>
          )}
          {pixivUrl}
            {hpUrl}
          {/* {!space.webcatalogUrl &&
            !space.pixivUrl &&
            !space.hpUrl && (
              <div>データなし</div>
            )} */}
  
          <h4>Twitter</h4>
          {/* {space.tweetText ? (
            <blockquote
              className="twitter-tweet"
              data-lang="ja"
              dir="ltr"
            >
              <p lang="ja" dir="ltr">{space.tweetText}</p>
              <script>
                {`document.write("— (" + tweetAuthor + ")");`}
              </script>
              <a
                href={`${space.tweetUrl}?ref_src=twsrc%5Etfw`}
              >
                {#dates.format(
                  new java.util.Date(space.tweetCreatedAt),
                  'yyyy年MMMdd日'
                )}
              </a>
            </blockquote>
          ) : (
            <>
              <a href={`https://twitter.com/${space.twitterId}`}>
                @{space.twitterId}
              </a>
              <p>
                このサークルはまだお品書きを公開していないようです。
              </p>
            </>
          )} */}
        </li>
      </ul>
        
    );
};