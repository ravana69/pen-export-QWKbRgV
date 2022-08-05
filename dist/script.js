RGBA(`
        vec2 mirror(vec2 uv){
             const float count = 3.;
             float a = 3.1415/count/2.;
             float cs = cos(a), sn = sin(a);
             mat2 rot = mat2(cs, -sn, sn, cs); 
             for (float i = 0.0; i<count; i++ )
                 uv = abs(uv*rot);  
             return uv;
        }

        void main() {
            vec2 uv = gl_FragCoord.xy/resolution-0.5;
            uv.x *= resolution.x/resolution.y;
            
            for(float i=1.; i<21.; i++) {
                uv = mirror(uv);
                uv -= i*0.02;
            } 
            uv *= 21.;
            vec2 index = floor(uv);
            uv = fract(uv);
            vec3 c = vec3(
                smoothstep(0.1, 0.05, abs(fract(uv.x+time*0.2)-0.51)),
                smoothstep(0.1, 0.05, abs(fract(uv.x+time*0.2)-0.55)),
                smoothstep(0.1, 0.05, abs(fract(uv.x+time*0.2)-0.59))
            );
            gl_FragColor = vec4(vec3(c), 1.0);
        }
`)