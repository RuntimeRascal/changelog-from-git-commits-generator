import { version, IVersion } from "./interface";

class Version implements IVersion
{
    _version: version;

    constructor ( version: string = null )
    {
        if ( version != null )
            this.parse( version.trim() );
        else
            this._version = { major: -1, minor: -1, build: -1, revision: -1 };
    }

    get major () { return this._version.major; }
    get minor () { return this._version.minor; }
    get build () { return this._version.build; }
    get revision () { return this._version.revision; }

    valid (): boolean
    {
        if ( this.major == -1 )
            return false;
        return true;
    }

    parse ( version: string ): version
    {
        this._version = { major: -1, minor: -1, build: -1, revision: -1 }
        if ( !version.match( /^[0-9,.]*$/g ) )
            return this._version;

        if ( version.length > 0 )
        {
            let tokens = version.split( '.' );
            this._version.major = tokens.length >= 1 ? +tokens[ 0 ] : -1;
            this._version.minor = tokens.length >= 2 ? +tokens[ 1 ] : -1;
            this._version.build = tokens.length >= 3 ? +tokens[ 2 ] : -1;
            this._version.revision = tokens.length >= 4 ? +tokens[ 3 ] : -1;
        }

        return this._version
    }

    compare ( version: Version ): number
    {
        if ( this.major > version.major )
        {
            return 1;
        } else if ( this.major == version.major )
        {
            if ( this.minor > version.minor )
            {
                return 1;
            } else if ( this.minor == version.minor )
            {
                if ( this.build > version.build )
                {
                    return 1;
                } else if ( this.build == version.build )
                {
                    if ( this.revision > version.revision )
                    {
                        return 1;
                    } else if ( this.revision == version.revision )
                    {
                        return 0;
                    }
                    else
                    {
                        return -1;
                    }
                }
                else
                {
                    return -1;
                }
            }
            else
            {
                return -1;
            }
        }
        else
        {
            return -1;
        }
    }

    toString (): string
    {
        if ( this.revision != -1 )
            return `${ this.major }.${ this.minor }.${ this.build }.${ this.revision }`;

        if ( this.build != -1 )
            return `${ this.major }.${ this.minor }.${ this.build }`;

        if ( this.minor != -1 )
            return `${ this.major }.${ this.minor }`;

        if ( this.major != -1 )
            return `${ this.major }`;

        return '0.0.0';
    }
}

export default Version;