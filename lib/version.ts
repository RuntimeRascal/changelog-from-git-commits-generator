import { version, IVersion } from "./interface";

class Version implements IVersion
{
    _version: version;
    _unparsed: string;

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
    get unparsed () { return this._unparsed; }

    valid (): boolean
    {
        if ( this.major == -1 )
            return false;
        return true;
    }

    getLeadingDigits ( str: string )
    {
        // if the str is all digits then just return a number
        if ( /^\d+$/.test( str ) )
            return +str;

        // does string start with a digit
        if ( /^\d+$/.test( str[ 0 ] ) )
        {
            return +str.replace( /\D/g, '' );
        }

        return -1;
    }

    parse ( version: string ): version
    {
        this._unparsed = version;

        let versionRegex = /(?=\w?)(\d+\.(\d+\.?(\d+\.?(\d+)?))(-\w+(\.\d+)?)?)/;
        let versionMatch = versionRegex.exec( version );
        if ( versionMatch && versionMatch[ 0 ] )
            version = versionMatch[ 0 ];

        //TODO: what about versions that have beta and such as 1.1.8-beta.4
        this._version = { major: -1, minor: -1, build: -1, revision: -1 }
        //if ( !version.match( /^[0-9,.]*$/g ) )
        //    return this._version;

        if ( version.length > 0 )
        {
            let tokens = version.split( '.' );
            if ( tokens.length >= 1 )
                this._version.major = this.getLeadingDigits( tokens[ 0 ] );
            if ( tokens.length >= 2 )
                this._version.minor = this.getLeadingDigits( tokens[ 1 ] );
            if ( tokens.length >= 3 )
                this._version.build = this.getLeadingDigits( tokens[ 2 ] );
            if ( tokens.length >= 4 )
                this._version.revision = this.getLeadingDigits( tokens[ 3 ] );
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